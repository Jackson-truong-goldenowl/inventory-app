# inventory-app
# node version 16
# deploy
- run sls deploy 

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

| Parameter | Type     | 
| :-------- | :------- | 
| `discountNum`      | `number` |
| `category`         | `string` |

#### Ceate item inventory

```
  POST - https://s67thn3g77.execute-api.ap-southeast-1.amazonaws.com/invetory
```

| Parameter       | Type     | Description                |
| :-------------  | :------- | :---------                 |
| `id`            | `string` |                            | 
| `name`          | `string` |                            | 
| `category`      | `string` |                            |
| `curren_stock`  | `string` |                            |
| `price`         | `string` |                            |
| `supplier`      | `string` | {name: string , description: string} |


  
