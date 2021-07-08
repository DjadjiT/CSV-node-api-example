import { Router } from 'express';
import { Parser } from 'json2csv';

const router = Router();
const axios = require('axios')

router.post('/:blackBoxName/:modelId', async (req, res) => {
  let body = req.body
  let url = "http://techsprint-etu.cloudbdf.fr/blackbox_"+req.params.blackBoxName.toLocaleUpperCase()+"/model_"+req.params.modelId
  let promises = []
  let data = []
  body.forEach(async (element) => {
    promises.push(axios.post(
      url, 
      element, 
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic dGVhbV9lMzppREJiRkZwdA=="
      }}))
  });

  Promise.all(promises).then((results) => {
    results.forEach(e=> data.push(e.data))
    
    const json2csv = new Parser();
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment("tab.csv");
    return res.send(csv);
  })
  .catch((e) => {
      return res.status(400).send(e)
  });

});

export default router;
