import { Router } from 'express';
import { Parser } from 'json2csv';

const router = Router();
const axios = require('axios')

router.post('/:blackBoxName/:modelId', (req, res) => {
  let body = req.body
  let url = "http://techsprint-etu.cloudbdf.fr/blackbox_"+req.params.blackBoxName.toLocaleUpperCase()+"/model_"+req.params.modelId

  axios.post(
    url, 
    body, 
    { headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic dGVhbV9lMzppREJiRkZwdA=="
    }}).then((res)=>{
      let json = res.data
      const json2csv = new Parser();
      const csv = json2csv.parse(json);
      res.header('Content-Type', 'text/csv');
      res.attachment("tab.csv");
      return res.send(csv);
  }).catch((err)=>{
    return res.status(400).send(err.response.data)
  })
});

export default router;
