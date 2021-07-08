import { Router } from 'express';

const router = Router();
const axios = require('axios')

const fields = [
  {
    label: 'nom colonne à afficher dans le csv',
    value: 'nom colonne à afficher dans le json'
  },
  {
   label: 'User Id',
    value: 'userId'
  }
];

const headers = {
  'Content-Type': 'application/json',
}

router.get('/model/:id', (req, res) => {
  let body = {

  }
  let url = "http://techsprint-etu.cloudbdf.fr/blackbox_W/model_"+req.params.id

  axios.post(
    url, 
    body, 
    headers).then((res)=>{
      let json = res.data
      const json2csv = new Parser({ fields });
      const csv = json2csv.parse(json);
      res.header('Content-Type', 'text/csv');
      res.attachment("tab.csv");
      return res.send(csv);
  }).catch((err)=>{
    return res.status(400)
  })
});

export default router;
