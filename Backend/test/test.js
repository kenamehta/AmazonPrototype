var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Amazon Prototype', function(){

  it('GET /product/admin/getProductCategory - Verifying category count',function(done){
      agent.get('/product/admin/getProductCategory').send({})
          .then(function(res){
              // console.log(res.body);
              expect(res.body.length).to.equal(5);
              done();
          })
          .catch((e) => {
              done(e);
          });
  });

  it('GET /customer/orders/:email - Verifying order count',function(done){
    agent.get('/customer/orders/pranjal.jain@sjsu.edu').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.data.length).to.equal(2);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('POST /customer/orders/list/cancel/product/:email - Verifying cancel order count',function(done){
    agent.post('/customer/orders/list/cancel/product/pranjal.jain@sjsu.edu').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.data.length).to.equal(1);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET /customer/orders/list/open/product/:email - Verifying open order count',function(done){
    agent.get('/customer/orders/list/open/product/pranjal.jain@sjsu.edu').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.data.length).to.equal(0);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET /customer/address/:id - Verifying address count',function(done){
    agent.get('/customer/address/5e955bb51616493fa824cdf0').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.addresses.length).to.equal(12);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET /customer/payment/:id - Verifying payment card count',function(done){
    agent.get('/customer/payment/5e955bb51616493fa824cdf0').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.paymentCards.length).to.equal(7);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET /customer/cartProducts/:id - Verifying saved product count',function(done){
    agent.get('/customer/cartProducts/5e955bb51616493fa824cdf0').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.savedCnt).to.equal(14);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET /customer/cartProducts/:id - Verifying cart product count',function(done){
    agent.get('/customer/cartProducts/5e955bb51616493fa824cdf0').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.cartCnt).to.equal(1);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET admin/analytics/report6 - Verifying most viewed product count',function(done){
    agent.get('/admin/analytics/report6').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.clicksArr.length).to.equal(7);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

  it('GET admin/analytics/report1 - Verifying number of orders per day count',function(done){
    agent.get('/admin/analytics/report1').send({})
        .then(function(res){
            // console.log(res.body);
            expect(res.body.adminReport1.length).to.equal(9);
            done();
        })
        .catch((e) => {
            done(e);
        });
  });

})