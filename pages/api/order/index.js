import Order from "../../../model/order";
import dbConnect from "../../../util/mongo";
const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
    try {
    } catch (error) {}
  }
  if (method === "POST") {
    const order = await Order.create(req.body);
    res.status(201).json(order);
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
