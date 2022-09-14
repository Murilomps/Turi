import redis from 'redis';

const blacklist = redis.createClient({ prefix: 'blacklist '});

export { blacklist };