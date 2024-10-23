import { createClient, defineScript } from 'redis';
import { itemsByViewsKey, itemsKey, itemsViewsKey } from "$services/keys";
import { createIndexes } from './create-indexes';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW,

	scripts: {
		unlock: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				local key=KEYS[1]
				local token=ARGV[1]
				if redis.call('GET',key) == token do
						return redis.call('DEL',key)
				end
			`,
			transformArguments(key: string, token: string) {
				return [key, token]
			},
			transformReply(reply, preserved) {
				return reply
			},
		}),
		addOneAndStore: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				return redis.call("SET",KEYS[1],1+tonumber(ARGV[1]))
			`,
			//passing the argument to EVAL SHA
			transformArguments(value: number, key: string) {
				return [key, value.toString()]
			},
			//how to return value from script to the program
			transformReply(reply) {
				return reply
			}

		}),

		incrementView: defineScript({
			NUMBER_OF_KEYS: 3,
			SCRIPT: `
				local itemsViewsKey = KEYS[1]
				local itemsKey = KEYS[2]
				local itemsByViewsKey = KEYS[3]
				local itemId = ARGV[1]
				local userId = ARGV[2]

				local inserted=redis.call("PFADD",itemsViewsKey,userId)
				if inserted == 1 then
					redis.call("HINCRBY",itemsKey,'views',1)
					redis.call("ZINCRBY",itemsByViewsKey,1,itemId)
				end
				
			`,
			transformArguments(itemId: string, userId: string) {
				return [itemsViewsKey(itemId), itemsKey(itemId), itemsByViewsKey(), itemId, userId]
			},
			transformReply(reply, preserved) {
				return reply
			},
		})
	}
});

client.on('error', (err) => console.error(err));
client.connect();
client.on('connect', async () => {
	try {
		await createIndexes()
	} catch (err) {
		console.log(err)

	}
})

export { client };
