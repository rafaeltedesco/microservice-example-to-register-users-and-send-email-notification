const { getCached } = require('../services/cache.service')

const getCachedAddressIfExists = async (req, res, next) => {
  const { cep } = req.body;
  const address = await getCached(cep);
  if (address) {
    res.locals.address = JSON.parse(address);
  }
  return next();
}

module.exports = {
  getCachedAddressIfExists,
};
