import { itemsByViewsKey, itemsKey, itemsViewsKey } from "$services/keys";
import { client } from "$services/redis";

export const incrementView = async (itemId: string, userId: string) => {
  //whenever user views an item
  const inserted = await client.pfAdd(itemsViewsKey(itemId),userId)
  //can use pfcount as well
  if (!inserted){
    await Promise.all([
    client.hIncrBy(itemsKey(itemId),"views",1),
    client.zIncrBy(itemsByViewsKey(),1,itemId)
  ])
  }
};
