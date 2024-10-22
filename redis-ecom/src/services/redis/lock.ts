import { randomBytes } from 'crypto'
import { client } from './client';
export const withLock = async (key: string, cb: () => any) => {
	//intialize the few variables to control retry behavior
	const retryDelayMs = 100;
	let retries = 20;

	// Generate a random value to store in redis
	const token = randomBytes(6).toString('hex')
	const lockKey = `lock:${key}`

	while (retries >= 0) {
		// Try to do a set NX operation
		// If set is successful, then run the callback
		retries--;
		//automatically expire the lock 
		const acquired = await client.set(lockKey, token, {
			NX: true,
			PX: 2000
		})

		if (!acquired) {
			await pause(retryDelayMs)
			continue
		}
		//unset the locked key
		try {
			const result = await cb()
			return result
		} finally {
			await client.unlock(key,token)
		}
	}
};

const buildClientProxy = () => { };

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
