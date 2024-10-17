import { itemsKey, userLikesKey } from "$services/keys";
import { client } from "$services/redis";

export const userLikesItem = async (itemId: string, userId: string) => {
  //if the user likes that item
  const likes=await client.sIsMember(userLikesKey(userId),itemId)
  return likes
};

export const likedItems = async (userId: string) => {
  const userLikedItems=await client.sMembers(userLikesKey(userId))
  
  };

export const likeItem = async (itemId: string, userId: string) => {
  //1 - added new value
  //0 - if not added
  const inserted = await client.sAdd(userLikesKey(userId), itemId)

    //add like to the item hash
    if (inserted){
      await client.hIncrBy(itemsKey(itemId),"likes",1)
    }
};

export const unlikeItem = async (itemId: string, userId: string) => {
 const removed =  await client.sRem(userLikesKey(userId), itemId)
 if (removed){
   await client.hIncrBy(itemsKey(itemId),"likes",-1)
 }
  

};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => { };
