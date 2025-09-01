import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 30 }); 

export const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
};
