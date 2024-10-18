import { itemsByEndingAtKey } from "$services/keys";
import { client } from "$services/redis";
import { getItems } from "./items";

export const itemsByEndingTime = async (
	order: 'DESC' | 'ASC' = 'DESC',
	offset = 0,
	count = 10
) => {
	const ids = await client.zRange(itemsByEndingAtKey(),Date.now(),"+inf",{
		BY:"SCORE",
		LIMIT:{
			offset,
			count
		}
	})
	return getItems(ids)
};
