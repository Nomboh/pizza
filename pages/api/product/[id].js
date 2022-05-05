import Product from "../../../model/product";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const prod = await Product.findById(id);
      res.status(200).json(prod);
    } catch (error) {
      res.status(500).json("error");
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(204).json("Product successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
