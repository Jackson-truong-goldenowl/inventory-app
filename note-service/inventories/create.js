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
  try {
    await dynamoDb.put(params).promise();
    return {
        message: 'Create success',
        data: params.Item
    } 
  } catch (error) {
    console.log(error);
  }
}