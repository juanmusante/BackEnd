const fs = require('fs/promises');
const { existsSync } = require('fs');

class ProductManager {

    constructor (path){
        this.path = path;
    }

    async readFile() {
        return await fs.readFile(this.path, 'utf-8');
    }

    async writeFile(string) {
        return await fs.writeFile(this.path, string, 'utf-8');
    }

    async getProducts() {
        try {
            if(existsSync(this.path)){
                const productString = await this.readFile();

                if(productString.length > 0) {
                const productParse = await JSON.parse(productString);
                return productParse;
                } else {
                return []
                }
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProducts(product) {
        try {
            const productArray = await this.getProducts();
            const inStock = productArray.find(item => item.code == product.code);

            const newProduct = {
                id: productArray.length + 1,
                ...product
            }
    
            if (inStock){
                console.error('This product is already in stock');
            } else {
                productArray.push(newProduct);
                const productString = JSON.stringify(productArray, null, '\t');
                await this.writeFile(productString);
                console.log(`The item ${product.title}, has been added.`);
            }
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const checkId = products.find(item => item.id === id);

            if(!checkId){
                console.error(`id: ${id} not found.`)
            } 
            
            return checkId;
        } catch (error){
            console.log(error.message)
        }
    }

    async updateProduct(id, toUpdate) {
        const products = await this.getProducts();
        const findProduct = await this.getProductById(id);

        const productUpdate = { ...findProduct, ...toUpdate}

        const updateList = products.map(item =>{
            if(item.id === productUpdate.id){
                return productUpdate
            }else{
                return item
            }
        })

        const productString = await JSON.stringify(updateList, null, '\t');

        await this.writeFile(productString)

        return productString;
    } 

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const productDelete = await products.filter(item => item.id !== id);
            
            const productString = await JSON.stringify(productDelete, null, '\t');

            await this.writeFile(productString)

            return productString;

        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = ProductManager;