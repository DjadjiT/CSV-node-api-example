import { Router } from 'express';
import { Parser } from 'json2csv';

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
  auth: {
    username: "team_e3",
    password: "iDBbFFpt "
  }
}

router.post('/:id', (req, res) => {
  let body = {

  }
  let url = "http://techsprint-etu.cloudbdf.fr/blackbox_W/model_"+req.params.id

  axios.post(
    url, 
    body, 
    {
      auth: {
        username: "team_e3",
        password: "iDBbFFpt "
      }
    }).then((res)=>{
      let json = res.data
      const json2csv = new Parser({ fields });
      const csv = json2csv.parse(json);
      res.header('Content-Type', 'text/csv');
      res.attachment("tab.csv");
      return res.send(csv);
  }).catch((err)=>{
    return res.status(400).send(err)
  })
});

export default router;
