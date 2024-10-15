import type { CreateUserAttrs } from '$services/types';
import {client} from "$services/redis"
import { genId } from '$services/utils';
import { usersKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
  const user = await client.hGetAll(usersKey(id))
  return deserialize(id,user)
};

export const createUser = async (attrs: CreateUserAttrs):Promise<string> => {
  //TODO:Check whether the user with the username already exist
  //---------------------------------------------------------------//

  //generate the unique id associated with the user
  const userId = genId();


  //client library generic syntax.
  await client.hSet(usersKey(userId), serialize(attrs))

  return userId

};

//removes the unnecessary fields which consumes the resources of the redis
const serialize=(user: CreateUserAttrs)=>{
    //TODO:- Hash the password
    return {
      username:user.username,
      password:user.password
    }
}

const deserialize=(id:string,user:{[key:string]:string})=>{
  return {
    id:id,
    user:user.username,
    password:user.password
  }
}
