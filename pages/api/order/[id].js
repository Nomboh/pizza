import Order from "../../../model/order";
import dbConnect from "../../../util/mongo";
const handler = async (req, res) => {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;
  if (method === "GET") {
    const order = await Order.findById(id);
    res.status(200).json(order);
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "DELETE") {
    try {
    } catch (error) {}
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
