const express = require('express');
const { resolve } = require('path');
const Menu = require('./menuModel');
const { default: mongoose } = require('mongoose');
const database = require('./db');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(express.static('static'));

app.get('/', async(req, res) => {
  const menus = await Menu.find();
  res.json(menus);
})

app.post('/post/menu', async (req, res)=> {
  const { name, description, price } = req.body;

  if(!name || !price){
    res.status(400).send('Name and price are required')
  }
  const menu = new Menu({ name, description, price });
  await menu.save();
  res.status(200).send('Menu item added');
})

app.listen(port, async () => {
  try{ await database()
    console.log('Connected to the database');
  }
  catch(err){
    console.error(err);
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
