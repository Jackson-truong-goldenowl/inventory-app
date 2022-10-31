# Serverless - AWS Node.js Typescript Version 2

Serverless Framework template for zero-config TypeScript support.
In this version of the template there is no `aws-sdk` npm package as it is recommended to use modular [version 3 of aws-sdk](https://github.com/aws/aws-sdk-js-v3) instead.

## Features

Thanks to [`serverless-typescript`](https://github.com/prisma-labs/serverless-plugin-typescript) plugin:

- Zero-config: Works out of the box without the need to install any other compiler or plugins
- Supports ES2015 syntax + features (`export`, `import`, `async`, `await`, `Promise`, ...)
- Supports `sls package`, `sls deploy` and `sls deploy function`
- Supports `sls invoke local` + `--watch` mode
- Integrates nicely with [`serverless-offline`](https://github.com/dherault/serverless-offline)

## Prerequisites

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)

## Usage


where `myServiceName` should be replaced with the name of your choice.

Then change directory to the newly created one:

```
cd myServiceName
```

And run:

```
npm install
```

or:

```
yarn
```

## Deploy
```bash
sls deploy
```
# Example
## API Reference

#### Get all items inventories

```
  - GET - https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/inventories
  - Limit 10 item
  - Pagination add params lastItem, ex: https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/inventories?lastItem=10
```

| Parameter  | 
| :--------  | 
| `lastItem` | 

#### Get item inventory

```
  GET https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/inventory/{id}
```

| Parameter | Type     | 
| :-------- | :------- | 
| `id`      | `string` |

#### Discount(discountNum, category)

```
  PUT - https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/inventory-discount
```

 - Body:
```json
{
  "discount": 1111111111111,
  "category": "Category1"
}
```

#### Ceate item inventory

```
  POST - https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/invetory
```
 - Body:
``` json
{
  "name": "Inventory",
  "category": "Category1",
  "price": 11000,
  "current_stock": "21",
  "supplier": {
      "name": "Raymond",
      "description": "Raymod provider"
  }
}
```


## Licence

MIT.

  
