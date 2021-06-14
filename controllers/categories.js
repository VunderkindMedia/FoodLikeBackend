const {Categories} = require('../models');
const fetch = require('node-fetch');
const {posterApiToken} = require('../api/consts');
const {posterApiURL} = require('../api/consts');

const categoriesCreate = async (req, res, next) => {
  const categoryHook = req.body;
  const categoryURL = `${posterApiURL}menu.getCategory?token=${posterApiToken}&category_id=${categoryHook.object_id}`;
  const categoryResponse = await fetch(categoryURL);
  const categoryJson = await categoryResponse.json();
  const category = categoryJson.response;
  Categories.find({category_id: category.category_id}, (err,document) => {
    if (document.length > 0) {
      res.send({
        response: {
          msg: 'Категория уже существует',
        }
      })
    } else {
      Categories.create(category).then((doc) => res.send({
        response: {
          msg: 'Категория создана',
          data: doc
        }
      }))
    }
  })

  return category;
};

const categoriesChange = async (req, res, next) => {
  const categoryHook = req.body;
  const categoryURL = `${posterApiURL}menu.getCategory?token=${posterApiToken}&category_id=${categoryHook.object_id}`;
  const categoryResponse = await fetch(categoryURL);
  const categoryJson = await categoryResponse.json();
  const category = categoryJson.response;


  await Categories.findOneAndUpdate({category_id: categoryHook.object_id},
      category, { runValidators: true }, ((err, doc) => {
        res.send({response: {
            msg: 'Категория обновлена',
            data: doc
          }})
        if (err) throw err
      }))
  return category;
}

const categoryDelete = async (req, res, next) => {
  const categoryHook = req.body;
  Categories.findOneAndRemove({category_id: categoryHook.object_id}).then(doc => {
    res.send({
      response: {
        msg: 'Категория удалена',
        data: doc
      }
    })
  })
}

const categoriesGet = async (req, res, next) => {
  const date = req.query;
  Categories.find(date)
  .then((categories)=> res.send({ data: categories }))
  .catch((err) => res.send({ error: err.message }))
  .catch(next);
}

const insertAllCategories = async (req, res, next) => {

  const url = `${posterApiURL}menu.getCategories?token=${posterApiToken}`

  const response = await fetch(url);
  const data = await response.json();
  data.response.forEach(category => {
    Categories.findOne({category_id: category.category_id}).then(document => {
      if (!document) {
        Categories.create(category)
      } else {
        Categories.findOneAndUpdate({category_id: category.category_id}, category).then(doc => {
          console.log('Дубликат', doc);
        })
      }
    })
  })
  res.send({
    data: {
      msg: 'Готово'
    }
  })

  // Categories.create(data.response, (err, list) => {
  //   res.send({ data: list })
  //   if (err) throw err
  // })
}

module.exports = {
  categoriesGet, categoriesCreate, insertAllCategories, categoryDelete, categoriesChange
};
