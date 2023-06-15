const Orders = require('../model/order.model');
const orderRegisterCtrl = async (req, res) => {
  try {
    let data = new Orders(req.body);
    let createData = await data.save();
    res.status(201).send(createData)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
};

const getOrdersCtrl = async (req, res) => {
  const userId = req.params.id;
  Orders.find({ userId })
    .then((orders) => {
      res.status(200).json({
        success: true,
        data: orders,
      });
    })
    .catch((error) => {
      console.log("Error fetching orders:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch orders",
      });
    });
};

const deleteOrderCtrl = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedData = await Orders.findByIdAndDelete(_id);
    res.send(deletedData)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const updateOrderCtrl = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = await Orders.findByIdAndUpdate({ _id }, req.body, { new: true });
    res.status(201).send(updatedData)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = { orderRegisterCtrl, getOrdersCtrl, deleteOrderCtrl, updateOrderCtrl };