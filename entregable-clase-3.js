class ProductManager {

    static idControl = 0;

    constructor (){
        this.products = [];
    }

    addProducts(title, description, price, thumbnail, code, stock) {

        ProductManager.idControl++;
        
        const codeError = this.products.find(item => item.code == code);

        const newProduct = {
            id: ProductManager.idControl,
            title,
            description,
            price,
            thumbnail,
            code,
            stock 
        }

        const itemInfo = Object.values(newProduct);
        const infoError = itemInfo.filter(item => item !== undefined);

        if (codeError){
            console.error(`The item ${title} is already added with the code ${code}.`);
        } else if (infoError.length < 7) {
            console.error(`Some information is missing`);
        } else {
            this.products.push(newProduct)
            console.log(`The item ${title}, has been added.`)
        }
    }

    getProducts = () => {
        console.log(this.products);
    }

    getProductById = (id) => {
        const checkId = this.products.find(item => item.id === id)

        if(checkId){
            console.log(checkId)
        } else {
            console.error(`id: ${id} not found.`)
        }
    }
}

// let ProductManager1 = new ProductManager;
// ProductManager1.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
// ProductManager1.getProducts();
// ProductManager1.getProductById(1);
// ProductManager1.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
// ProductManager1.getProductById(12);