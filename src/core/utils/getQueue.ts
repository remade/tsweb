import Queue from 'bull';
import { config } from '@/core/utils';

const queues = {};
export const getQueue = (name: string) => {
    const { host, username, password, port } = config('redis');
    if (!queues[name]) {
        queues[name] = new Queue(name, { redis: { port, host, password } });
    }

    return queues[name];
};
