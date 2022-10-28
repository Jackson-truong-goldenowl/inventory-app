'use strict';
	
const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.discountInventories = async (event) => {
    const data = JSON.parse(event.body);
    try {
        const dataInventories = await fetchData();
        const result = await discountItems(data.discountNum, data.category, dataInventories);
        return {
            statusCode: 201,
            body: result,
        }
    }
    catch (err) {
        console.error(err);
    }
};
async function fetchData() {
    const params = {
        TableName: process.env.INVENTORY_TABLE,
      };
    const response = await dynamoDb.scan(params).promise();
    return response;
} 
async function discountItems(discountNum, category, dataInventories) {
//    const response = await discount(discountNum, '1')
    dataInventories?.Items.forEach(async(item)=>{
        const resultDiscount = discountNum
        if(category && category === item.category){
            await discount(resultDiscount, item.id)
        } 
        if (!category) {
            await discount(resultDiscount, item.id)
        }
    });
}

async function discount(discountNum, id) {
    const params = {
        TableName: process.env.INVENTORY_TABLE,
        Key: {
            "id": id,
        },
        UpdateExpression: "SET price =  :price",
        ExpressionAttributeValues: {
            ":price": discountNum
        },
        ReturnValues: "UPDATED_NEW"
    }
    try {
        const result = dynamoDb.update(params).promise();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }  
}



