'use strict';
	
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.getInventory = async (event) => {
    console.log('get id :',event.pathParameters.id);
    try {
        const params = {
          TableName: process.env.INVENTORY_TABLE,
          Key: {
            id: event.pathParameters.id,
          },
        };
        const response = await dynamoDb.get(params).promise();
        return {
           items: response.Item,
        }
  
      } catch (error) {
        throw error;
      }
}

