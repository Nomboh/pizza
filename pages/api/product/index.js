import Product from "../../../model/product";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const prod = await Product.find();
      res.status(200).json(prod);
    } catch (error) {
      res.status(500).json("error");
    }
  }

  if (method === "POST") {
    try {
      const prodoct = await Product.create(req.body);
      res.status(201).json(prodoct);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
