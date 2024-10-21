import { itemsByViewsKey, itemsKey, itemsViewsKey } from "$services/keys";
import { client } from "$services/redis";

export const incrementView = async (itemId: string, userId: string) => {
  //whenever user views an item
  // const inserted = await client.pfAdd(itemsViewsKey(itemId),userId)
  // //can use pfcount as well
  // if (!inserted){
  //   await Promise.all([
  //   client.hIncrBy(itemsKey(itemId),"views",1),
  //   client.zIncrBy(itemsByViewsKey(),1,itemId)
  // ])
  // }

  //custom script
  return client.incrementView(itemId,userId)
};

//scripting the above code
// Finding out the necessary keys
// 1. itemsViewsKey
// 2. itemsKey
// 3. itemsByViewsKey

// Finding out number of arguments i need to provide
//1. itemid
//2. userid
