import type { CreateUserAttrs } from '$services/types';
import { client } from "$services/redis"
import { genId } from '$services/utils';
import { usernamesKey, usernamesUniqueKey, usersKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {
  //usernames are unique so assign the sorted set with the score as userid
  const userId = await client.zScore(usernamesKey(), username)

  if (!userId) {
    throw new Error("User doesnot exist")
  }

  //convert id to hex
  const id = userId.toString(16)

  return await getUserById(id)
};

export const getUserById = async (id: string) => {
  const user = await client.hGetAll(usersKey(id))
  return deserialize(id, user)
};

export const createUser = async (attrs: CreateUserAttrs): Promise<string> => {

  //check if user exist within the set of username
  const isUserMember = await client.sIsMember(usernamesUniqueKey(), attrs.username)

  if (isUserMember) {
    //throw an error as username already exist
    throw new Error("Username is already taken")
  }

  //generate the unique id associated with the user
  const userId = genId();

  //client library generic syntax.
  await client.hSet(usersKey(userId), serialize(attrs))

  //add the username to the set
  await client.sAdd(usernamesUniqueKey(), attrs.username)
  await client.zAdd(usernamesKey(), {
    value: attrs.username,
    score: parseInt(userId, 16) //userId is hexadecimal
  })
  return userId

};

//removes the unnecessary fields which consumes the resources of the redis
const serialize = (user: CreateUserAttrs) => {
  //TODO:- Hash the password
  return {
    username: user.username,
    password: user.password
  }
}

const deserialize = (id: string, user: { [key: string]: string }) => {
  return {
    id: id,
    user: user.username,
    password: user.password
  }
}
