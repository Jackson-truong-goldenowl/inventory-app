'use strict';
	
const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.discountInventories = async (event) => {
    const data = JSON.parse(event.body);
    try {
        const dataInventories = await fetchData();
        await discountItems(data.discountNum, data.category, dataInventories);
        return {
            statusCode: 201,
            body: 'discount success',
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
    return  response;
} 
async function discountItems(discountNum, category, dataInventories) {
    const updates = [];
    dataInventories?.Items.forEach(async(item)=>{
        const resultDiscount = (item.price * ( 100 - discountNum))/100
        if(category && category === item.category && item.curren_stock > 0){
            updates.push(discount(resultDiscount, item.id))
        } 
        if (!category && item.curren_stock > 0) {
            updates.push(discount(resultDiscount, item.id))
        }
    });
    await Promise.all(updates);
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
        }
    }
    try {
        const result = dynamoDb.update(params).promise();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}



