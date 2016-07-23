/**
 * InvestmentController
 *
 * @description :: Server-side logic for managing investments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res, err) {
    Customer.findOne(req.param('owner'), function foundCustomer (err, customer) {
    	console.log(customer);
      if (err) return next(err);
      if (!customer) return next();
      res.view({
        customer: customer
      });
    });
  },

  create: function(req, res, next) {
    Investment.create(req.params.all(), function investmentCreated(err, investment) {
      if (err) return next(err);

      res.redirect('/customer/show/' + investment.owner);
    });
  },
  index: function(req,res,next){
    Investment.find(function foundInvestments (err, investments){
      if(err) return next(err);
     console.log(investments);
      res.view({
        investments: investments
      });
    });
  }

};

