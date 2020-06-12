export class Product {
    constructor(id){
        this.id = id
    }
}

export class Order{
    constructor(clientId, tableId, products, message){
        this.clientId = clientId
        this.tableId = tableId
        this.products = products
        this.message = message
    }
}
