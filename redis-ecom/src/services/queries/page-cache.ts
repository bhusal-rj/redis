import { pageCacheKey } from '$services/keys';
import { client } from '$services/redis';
const cacheRoutes = ['/about', '/privacy', '/auth/signup', '/auth/signin'];
export const getCachedPage = (route: string) => {
	// route will be in the form of /about
	if (cacheRoutes.includes(route)) {
		return client.get(pageCacheKey(route));
	}
	return null;
};

export const setCachedPage = (route: string, page: string) => {
	//argument will be <html> for page
	if (cacheRoutes.includes(route)) {
		return client.set(pageCacheKey(route), page, {
			EX: 20 //expires in 20 seconds
		});
	}
	return null;
};
