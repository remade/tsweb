import Redis from 'ioredis';
import { config } from '@/core/utils';

let redisClient: any;
export const getRedis = () => {
    if (!redisClient) {
        const { host, port, password, username } = config('redis');

        redisClient = new Redis({
            host,
            port,
            password,
            username,
        });
    }

    return redisClient;
};
