import { itemsIndexKey } from "$services/keys";
import { client } from "$services/redis";
import { deserialize } from "./deserialize";

export const searchItems = async (term: string, size: number = 5) => {
  //implement the fuzzy search here

  const cleaned = term.replaceAll(/[^a-zA-Z0-9]/g, "").trim().split(" ").map(st => st ? "%" + st + "%" : "").join(" ")

  //Look at clened and make sure it is valid
  if (cleaned.length == 0) return []

  const query=`(@name:(${cleaned})=>{$weight : 5.0}) | (@description:(${cleaned}))`

  //use the client to do the action. Default is text
  const unserialized =await client.ft.search(itemsIndexKey(), query, {
    LIMIT: {
      from: 0,
      size: size
    }
  })

  //deserialize
  return unserialized.documents.map(({id,value})=> deserialize(id,value as any))

};
