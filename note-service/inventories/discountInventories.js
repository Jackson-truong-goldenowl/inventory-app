'use strict';
	
const uuid = require('uuid');
const AWS = require('aws-sdk'); 
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.discountInventories = async (discountNum, category) => {
    try {
        if(!!category) {
            await discountWithCategory(discountNum, category);
        } else { 
            await discountAll(discountNum)
        }

        return {
            statusCode: 201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    catch (err) {
        console.error(err);
    }
};

function discountWithCategory(discountNum, category) {
    const params = {
        TableName: process.env.INVENTORY_TABLE,
        Key: {
        "category": category
    },
        UpdateExpression: "SET price = :price", //status is a reserved ATTRIBUTE
        ExpressionAttributeValues: {
            ":price": discountNum
        }
    }
    return dynamoDb.put(params).promise();
}

function discountAll(discountNum) {
    const params = {
        TableName: process.env.INVENTORY_TABLE,
        UpdateExpression: "SET price = price * :price", //status is a reserved ATTRIBUTE
        ExpressionAttributeValues: {
            ":price": discountNum
        }
    }
    return dynamoDb.put(params).promise();
}



