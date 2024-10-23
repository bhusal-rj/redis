import { itemsIndexKey, itemsKey } from "$services/keys";
import { SchemaFieldTypes } from "redis";
import { client } from "./client";

export const createIndexes = async () => {
  //create the index using node redis
  const indexes = await client.ft._list();
  const exists = indexes.findIndex(index => index === itemsIndexKey())
  if (exists == -1) {
    return client.ft.create(itemsIndexKey(), {
      name: {
        type: SchemaFieldTypes.TEXT,
        sortable: true
      },
      description: {
        type: SchemaFieldTypes.TEXT,
        sortable: true

      },
      ownerId: {
        type: SchemaFieldTypes.TAG,
        sortable: false
      },
      endingAt: {
        type: SchemaFieldTypes.NUMERIC,
        sortable: true
      },
      bids: {
        type: SchemaFieldTypes.NUMERIC,
        sortable: false
      },
      views: {
        type: SchemaFieldTypes.NUMERIC,
        sortable: true
      },
      price: {
        type: SchemaFieldTypes.NUMERIC,
        sortable: true
      },
      likes: {
        type: SchemaFieldTypes.NUMERIC,
        sortable: true
      }

    } as any, {
      ON: "HASH",
      PREFIX: itemsKey("")
    })
  }
  return

};
