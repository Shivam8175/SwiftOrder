import { createObjectCsvWriter } from "csv-writer";
export const exportOrdersToCSV = async (orders, outputPath) => {
  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: "_id", title: "OrderID" },
      { id: "status", title: "Status" },
      { id: "paymentCollected", title: "Paid" },
    ],
  });
  await csvWriter.writeRecords(orders);
};
