const express = require('express');
const router = express.Router();
// Place Order API (/api/orders/place):
const Order = require('../Models/Order');

router.post('/place', async (req, res) => {
  try {
    const { userId,items, total } = req.body;
    const newOrder = new Order({ userId,items, total });
    await newOrder.save();
    console.log({ userId,items, total })
    res.json({ success: true, orderId: newOrder._id, message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
    try {

        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json({message: "Orders Fetched Successfully", orders})
    }
    catch(err) {
        res.status(500).json({err_msg: "Unable to fetch orders due to api error"});
    }
})
// Change Order Status API (/api/orders/status/:orderId):
router.put('/status/:orderId', async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { status } = req.body;
      await Order.updateOne({ _id: orderId }, { status });
      res.json({ success: true, message: 'Order status updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  module.exports=router;