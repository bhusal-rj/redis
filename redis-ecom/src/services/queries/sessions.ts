import { sessionKey } from '$services/keys';
import { client } from '$services/redis';
import type { Session } from '$services/types';

export const getSession = async (id: string) => {
  const session =  await client.hGetAll(sessionKey(id))

  //if no session is found than the hgetAll returns {}
  if (Object.keys(session).length === 0){
    return null
  }
  return deserialize(id,session)
};

export const saveSession = async (session: Session) => {
  //create the session key
  await client.hSet(sessionKey(session.id),serialize(session))

};


const serialize=(session:Session)=>{
  return {
    userId:session.userId,
    username:session.username
  }
}

const deserialize=(id:string, session :{[key:string]:string})=>{
  return {
  id,
  userId: session.userId,
  username:session.username
}
}
