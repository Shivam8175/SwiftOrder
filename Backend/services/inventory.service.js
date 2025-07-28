import ProductModel from "../models/product.model";

exports.reserveStock = async (items, session) => {
  for (const item of items) {
    const updated = await ProductModel.findOneAndUpdate(
      {
        _id: item.product,
        stock: { $gte: item.quantity },
      },
      { $inc: { stock: -item.quantity } },
      { new: true, session }
    );
    if (!updated) {
      throw new Error(`Insufficient stock for product ${item.product}`);
    }
  }
};

exports.releaseStock = async (items) => {
  for (const item of items) {
    await ProductModel.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }
};
