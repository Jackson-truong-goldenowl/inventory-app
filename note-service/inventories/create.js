const AWS = require('aws-sdk'); 
const invetoryTable = process.env.INVENTORY_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.saveInventory = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
      TableName: invetoryTable,
      Item: {
          id: data.id,
          name: data.name,
          category: data.category,
          curren_stock: data.curren_stock,
          price: data.price,
          supplier: {
            name: data.supplier.name,
            description: data.supplier.description
          }
      }
  }
  dynamoDb.put(params, (err, result) => {
      if (err) {
          console.log(err);
      }
      const response = {
          statusCode: 200,
          body: JSON.stringify(result.Item),
      };
      callback(null, response);
  });
}