const { News, Category, Author } = require("../models");

class NewsController {
  static async showNews(req, res, next) {
    try {
      const everyNews = await News.findAll({
        include: [Category, Author]
      });
      res.status(200).json(everyNews);
    } catch (err) {
      return next(err)
    }
  }

  static async createNews(req, res, next) {
    try {
      let result = await News.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        userId: req.user.id,
        categoryId: req.body.categoryId,
      });
      res.status(201).json({
        msg: `Create News Sucess`,
        News: result,
      });
    } catch (err) {
      next(err)
    }
  }

  static async updateNews(req, res, next) {
    try {
      let selectedNews = await News.findByPk(req.params.id);
      if (!selectedNews) throw{name: 'News Id not found'}
      else {
        let { title, content, imageUrl, categoryId } = req.body;
        let obj = { title, content, imageUrl, userId: req.user.id, categoryId };
        let recreateNews = await News.update(obj, {
          where: { id: req.params.id },
        });

        res.status(200).json({
          msg: `Update Done`,
          previous: selectedNews,
        });
      }
    } catch (err) {
      next(err)
    }
  }

  static async destroyNews(req, res, next) {
    try {
      let foundNews = await News.findByPk(req.params.id);
      if (!foundNews) throw{name: 'News Id not found'}
      else {
        let deletedNews = await News.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: `${foundNews.title} has been deleted` });
      }
    } catch (err) {
      next(err)
    }
  }

  static async findNews(req, res, next) {
    try {
      let foundNews = await News.findByPk(req.params.id);
      if (!foundNews) {
        throw{name: 'News Id not found'}
        ;
      } else {
        res.status(200).json(foundNews);
      }
    } catch (err) {
      next(err)
    }
  }

  static async showCategories(req, res, next) {
    try {
      const everyCategory = await Category.findAll();
      res.status(200).json(everyCategory);
    } catch (err) {
      next(err)
    }
  }
}

module.exports = NewsController;
