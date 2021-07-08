import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import { Parser } from 'json2csv';

const router = Router();
const axios = require('axios')


router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };
  const fields = [
    {
      label: 'text',
      value: 'text'
    },
    {
     label: 'User Id',
      value: 'userId'
    }
  ];
  const json2csv = new Parser({ fields });
  req.context.models.messages[id] = message;
  const csv = json2csv.parse(message);
  res.header('Content-Type', 'text/csv');
  res.attachment("messages.csv");

  return res.send(csv);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
