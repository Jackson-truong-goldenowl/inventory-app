const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getListInventories = async (event) => {
  const paramRe = event.queryStringParameters;
  try {
    const params = {
      TableName: process.env.INVENTORY_TABLE,
      Limit: 10,
    };
    if (paramRe && paramRe?.lastItem) {
      params.ExclusiveStartKey = { id: paramRe.lastItem };
    }
    const response = await dynamoDb.scan(params).promise();
    return {
      items: response.Items,
      lastItem: response.LastEvaluatedKey,
    };
  } catch (error) {
    throw error;
  }
};
