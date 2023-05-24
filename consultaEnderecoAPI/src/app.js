const express = require('express');
const { getCEPInfo } = require('./services/cep.service');

const app = express();

app.use(express.json());

app.post('/get-address-info', async (req, res) => {
  const { cep } = req.body;
  try {
    console.time('consulta_endereco');
    const cepData = await getCEPInfo(cep);
    console.timeEnd('consulta_endereco');
    return res.status(200).json(cepData);
  } catch (err) {
    return res.status(err.cause).json({
      err: err.message
    });
  }
})

module.exports = app;