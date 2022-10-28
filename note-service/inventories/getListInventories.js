'use strict';
	
const uuid = require('uuid');
const AWS = require('aws-sdk'); 
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.getListInventory = async (lastItem = 0) => {
    try {
        const params = {
          TableName: process.env.INVENTORY_TABLE,
          Limit: 10,
        };
        if (lastItem) {
          params.ExclusiveStartKey = { id: lastItem};
        }
        const response = await dynamoDb.scan(params).promise();
        return {
           items: response.Items,
           lastItem: response.LastEvaluatedKey
        }
  
      } catch (error) {
        throw error;
      }
}

