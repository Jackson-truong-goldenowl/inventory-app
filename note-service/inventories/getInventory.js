const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getInventory = async (event) => {
  try {
    const params = {
      TableName: process.env.INVENTORY_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
    };
    const response = await dynamoDb.get(params).promise();
    return response.Item;
  } catch (error) {
    throw error;
  }
};
