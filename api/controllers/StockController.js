/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res, err) {
    Customer.findOne(req.param('owner'), function foundCustomer (err, customer) {
      if (err) return next(err);
      if (!customer) return next();
      res.view({
        customer: customer
      });
    });
  },

  create: function(req, res, next) {
    Stock.create(req.params.all(), function stockCreated(err, stock) {
      if (err) return next(err);

      res.redirect('/customer/show/' + stock.owner);
    });
  },
  index: function(req,res,next){
    Stock.find(function foundStocks (err, stocks){
      if(err) return next(err);
     console.log(stocks);
      res.view({
        stocks: stocks
      });
    });
  },
  edit: function(req,res,next) {
    Stock.findOne(req.param('id'), function foundStock(err, stock) {
      if(err) return next(err);
      if (!stock) return next();
      res.view({
        stock: stock
      });
    });
  },
  update: function(req, res, next) {
    Stock.update(req.param('id'), req.params.all(), function stockUpdated(err){
      if (err) {
        return res.redirect('/stock/edit/' + req.param('id'));
      }

      res.redirect('/stock/show/' + req.param('id'));
    });
  },
  show: function (req, res, next) {
    Stock.findOne(req.param('id')).populateAll().exec(function (err, stock) {
      if (err) return next(err);
      if (!stock) return next();
      res.view({
        stock: stock
      });
    });

  }
};

