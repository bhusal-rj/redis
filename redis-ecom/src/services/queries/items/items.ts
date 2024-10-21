import { itemsKey, itemsByViewsKey, itemsByEndingAtKey, itemsByPriceKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateItemAttrs } from '$services/types';
import { genId } from '$services/utils';
import { deserialize } from './deserialize';
import { serialize } from './serialize';

export const getItem = async (id: string) => {
  const item = await client.hGetAll(itemsKey(id))
  if (Object.keys(item).length == 0) {
    return null;
  }
  return deserialize(id, item)
};

export const getItems = async (ids: string[]) => {
  //get all items from the redis
  //one approach will be to use loop and do hGetAll
  //it takes some amount of time


  //another approach will be to use the pipeline
  //donot use await inside the promise.all
  const results = await Promise.all(ids.map(id => client.hGetAll(itemsKey(id))))
  return results.map((result, idx) => {
    if (Object.keys(result).length == 0) {
      return null
    }
    return deserialize(ids[idx], result)
  })
};


export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
  //store dates in the form of unix milliseconds
  const itemId = genId();

  await Promise.all([
  //whenever the new item is created initialize it's views to be zero
    client.zAdd(itemsByViewsKey(), {
      value: itemId,
      score: 0
    }),
    client.hSet(itemsKey(itemId), serialize(attrs)),
    client.zAdd(itemsByEndingAtKey(),{
      value:itemId,
      score:attrs.endingAt.toMillis()
    }),
    client.zAdd(itemsByPriceKey(),{
      value:itemId,
      score:0
    })
  ])
  return itemId;
};

