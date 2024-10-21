import { bidHistoryKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateBidAttrs, Bid } from '$services/types';
import { DateTime } from 'luxon';

export const createBid = async (attrs: CreateBidAttrs) => {
	//better to use the sorted set in place of lists.
	const { amount, createdAt } = attrs
	return await client.rPush(bidHistoryKey(attrs.itemId), serializeBid(amount, createdAt.toMillis()))
};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	//get the bid history in the application
	//returns the bid history for a single item in order of increasing timestamp
	const endIndex=-1-offset
	const startIndex=-1*offset-count
	const range=await client.lRange(bidHistoryKey(itemId),startIndex,endIndex)
	return range.map(bid=>deserializeBid(bid))
};

const serializeBid = (bidAmount: number, createdAt: number): string => {
	return `${bidAmount}:${createdAt}`
}

const deserializeBid = (bid: string) => {
	const splitted = bid.split(":")
	return { amount: parseFloat(splitted[0]), createdAt: DateTime.fromMillis(parseInt(splitted[1])) }
}
