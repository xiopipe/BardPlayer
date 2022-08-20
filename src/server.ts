/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require('express');
const appExpress = express();
appExpress.use(express.json());

appExpress.get('/test', (req: any, res: any) => {
  res.status(200).json({ result: 'hola mundo' });
});

appExpress.listen(3000, () => {
  console.log('servidor inicializado');
});
