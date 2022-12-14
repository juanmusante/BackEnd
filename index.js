const ProductManager = require('./entregable-c-5');

const product = new ProductManager('./data/Products.json');

const productsData = async () => {
    try {
        console.log('SIN PRODUCTOS');
        let products = await product.getProducts();
        console.log(products);
        
        console.log('Primer Producto');
        let producto1 = {title:"producto prueba", description:"Este es un producto prueba", price:202, thumbnail:"Sin imagen", code:"abc123", stock:25};
        await product.addProducts(producto1);

        console.log("Consulta productos cargados")
        products = await product.getProducts();
        console.log(products);

        console.log("Sumando Productos");
        let producto2 = {title:"producto prueba 2", description:"Este es el segundo producto prueba", price:7000, thumbnail:"Sin imagen", code:"dfe456", stock:12};
        await product.addProducts(producto2);

        console.log("Tercer consulta de productos")
        products = await product.getProducts();
        console.log(products);

        console.log("Actualizar producto")
        let update = await product.updateProduct(1,{price:5290})
        console.log(update)

    } catch (error) {
        console.log(error);
    }
}

productsData();