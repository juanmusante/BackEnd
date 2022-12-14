const fs = require('fs/promises');
const { existsSync } = require('fs');

class ProductManager {

    static idControl = 0;

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
                const productString = await this.readFile() 
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

    async addProducts(title, description, price, thumbnail, code, stock) {
        try {
            ProductManager.idControl++;
        
            const productArray = await this.getProducts();
    
            const newProduct = {
                id: ProductManager.idControl,
                title,
                description,
                price,
                thumbnail,
                code,
                stock 
            }

            const productString = JSON.stringify(productArray, null, '\t');
    
            if (!productArray){
                console.error(`The item ${title} is already added with the code ${code}.`);
            } else {
                productArray.push(newProduct);
                await this.writeFile(productString);
                console.log(`The item ${title}, has been added.`);
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
                return productUpdatel
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
            const productDelete = await products.filter(item => item != id);
            
            const productString = await JSON.stringify(productDelete, null, '\t');

            await this.writeFile(productString)

            return productString;

        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = ProductManager;