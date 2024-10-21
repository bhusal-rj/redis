import { bidHistoryKey, itemsKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateBidAttrs, Bid } from '$services/types';
import { DateTime } from 'luxon';
import { getItem } from './items';

export const createBid = async (attrs: CreateBidAttrs) => {
	//better to use the sorted set in place of lists.
	//check if the item exist
	//solve the concurrency issue as handling multiple bids at same time generates race around condition

	//for transaction create the new connection
	//this connection will only be used for transaction
	return client.executeIsolated(async (isolatedClient) => {
		await isolatedClient.watch(itemsKey(attrs.itemId))
		const item = await getItem(attrs.itemId)
		if (!item) {
			throw new Error("Item doesnot exist")
		}

		if (item.price >= attrs.amount) {
			throw new Error("Bid too low")
		}

		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
			throw new Error("Item close for bidding")

		}
		const { amount, createdAt } = attrs

		return isolatedClient.multi().rPush(bidHistoryKey(attrs.itemId), serializeBid(amount, createdAt.toMillis()))
			.hSet(itemsKey(item.id), {
				bids: item.bids + 1,
				price: attrs.amount,
				highestBidUserId: attrs.userId
			}).exec()
		
		
	})

};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	//get the bid history in the application
	//returns the bid history for a single item in order of increasing timestamp
	const endIndex = -1 - offset
	const startIndex = -1 * offset - count
	const range = await client.lRange(bidHistoryKey(itemId), startIndex, endIndex)
	return range.map(bid => deserializeBid(bid))
};

const serializeBid = (bidAmount: number, createdAt: number): string => {
	return `${bidAmount}:${createdAt}`
}

const deserializeBid = (bid: string) => {
	const splitted = bid.split(":")
	return { amount: parseFloat(splitted[0]), createdAt: DateTime.fromMillis(parseInt(splitted[1])) }
}
