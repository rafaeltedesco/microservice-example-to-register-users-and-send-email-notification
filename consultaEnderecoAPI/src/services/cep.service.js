const { default: axios } = require('axios');

const getCEPInfo = async (cep) => {
  const viaCEPAPIURL = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const { data } = await axios.get(viaCEPAPIURL);
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf
    }
  } catch (err) {
    throw new Error('Invalid CEP', { cause: 400 })
  }
}

module.exports = {
  getCEPInfo,
};