import type { CreateItemAttrs } from '$services/types';

export const serialize = (attrs: CreateItemAttrs) => {
  //store date in the form of UNIX timestamp in milliseconds
  return {
    ...attrs,
    price:0,
    createdAt:attrs.createdAt.toMillis(),
    endingAt:attrs.endingAt.toMillis()
    }
};
