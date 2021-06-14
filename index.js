const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {
  clientsRouter,
  pushRouter,
  imagesRouter,
  settingsRouter,
  uploadsRouter,
  ordersRouter,
  hooksRouter,
  productsRouter,
  categoriesRouter
} = require('./routes');
mongoose.connect('mongodb://dodoma-admin:rg8asgas7dJGFi@185.251.91.202:27017/foodlike?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
// mongoose.connect('mongodb+srv://root:AlIr4gkr4V04qSdh@cluster0.y4baa.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-pinu2a-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });
mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Total-Count, X-Requested-With");
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});
app.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function(req, res) {
  res.send('hello world Peolpes');
});

app.use('/api/hooks', hooksRouter);

app.use('/api/clients', clientsRouter);

app.use('/api/push', pushRouter);

app.use('/api/settings', settingsRouter);

app.use('/api/images', imagesRouter);

app.use('/api/uploads', uploadsRouter);

app.use('/api/orders', ordersRouter);

app.use('/api/products', productsRouter);

app.use('/api/categories', categoriesRouter);
