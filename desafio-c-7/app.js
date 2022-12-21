const express = require('express');
const ProductManager = require('./entregable-c-7');

const app = express();
const productManager = new ProductManager('./data/Products.json');

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit;

    if(!limit){
        return res.send(products);
    }

    const productsLimit = products.filter((product, i) => i < limit) 

    res.send(productsLimit)
})

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId; 
    const products = await productManager.getProducts();
    const product = products.find(e => e.id === +productId);

    if(!product){
        return res.send("ID NOT FOUND");
    }

    res.send(product);

})


app.listen(8080, () => {
    console.log("Server is up and running on port 8080");
})