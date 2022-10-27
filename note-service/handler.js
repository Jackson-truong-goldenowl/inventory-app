'use strict';
	
const uuid = require('uuid');
const AWS = require('aws-sdk'); 
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.index = async (evt) => {
  return {
    statusCode: 200,
    message: 'OK',
    body: JSON.stringify({
      data: "hello labda"
    })
  }
}


