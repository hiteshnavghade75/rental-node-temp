const express =require("express");
const Router = express.Router();
const cors = require("cors");
const {orderRegisterCtrl, getOrdersCtrl,deleteOrderCtrl,updateOrderCtrl} = require('../controller/OrderController')
Router
  .route('/')
  .post(orderRegisterCtrl)


Router
  .route('/:id')
  .get(getOrdersCtrl);
 

Router
  .route('/:id')
  .delete(deleteOrderCtrl);

 Router
  .route('/:id')
  .patch(updateOrderCtrl);


module.exports = Router;