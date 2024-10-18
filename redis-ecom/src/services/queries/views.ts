import { itemsByViewsKey, itemsKey } from "$services/keys";
import { client } from "$services/redis";

export const incrementView = async (itemId: string, userId: string) => {
  //whenever user views an item
  await Promise.all([
    client.hIncrBy(itemsKey(itemId),"views",1),
    client.zIncrBy(itemsByViewsKey(),1,itemId)
  ])
};
