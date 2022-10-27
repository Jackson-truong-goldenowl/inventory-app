'use strict';
module.exports.index = async (evt) => {
  return {
    statusCode: 200,
    message: 'OK',
    body: JSON.stringify({
      data: "hello labda"
    })
  }
}


