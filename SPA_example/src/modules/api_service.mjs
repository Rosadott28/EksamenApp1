
import { errorHandler } from "./error_handler.mjs";
import { CategoryArrayModel, ProductArrayModel } from "./models.mjs";
import { sendRequest } from "./utils.mjs";

const groupkey = "ABCDEF00"; // your groupkey here

//--------------------------------------------------------
export async function getCategories() {

    const url = `https://sukkergris.onrender.com/webshop/testdummy/categories?key=${groupkey}`;
    
    try {

        const dataFromServer = await sendRequest(url);

        // convert from server-data to app model-data
        const model = new CategoryArrayModel(dataFromServer);
        return model.data;
        
    } catch (error) {             
        errorHandler(error);
        return [];
    }
}

//--------------------------------------------------------
export async function getAllProducts() {

    const url = `https://sukkergris.onrender.com/webshop/testdummy/products?key=${groupkey}`;
    
    try {

        const dataFromServer = await sendRequest(url);

        // convert from server-data to app model-data
        const model = new ProductArrayModel(dataFromServer);
        return model.data;
        
    } catch (error) {             
        errorHandler(error);
        return [];
    }
}

//--------------------------------------------------------
export async function getProductsByCategory(catId) {
    const url = `https://sukkergris.onrender.com/webshop/testdummy/products?category_id=${catId}&key=${groupkey}`;
    
    try {

        const dataFromServer = await sendRequest(url);        

        // convert from server-data to app model-data
        const model = new ProductArrayModel(dataFromServer);
        return model.data;
        
    } catch (error) {             
        errorHandler(error);
        return [];
    }
}

//--------------------------------------------------------
export async function getProductById(id) {
    const url = `https://sukkergris.onrender.com/webshop/testdummy/products?id=${id}&key=${groupkey}`;
    
    try {

        const dataFromServer = await sendRequest(url);

        //convert from server API-data to app model-data
        const model = new ProductModel(dataFromServer[0]);       
        return model.data;
        
    } catch (error) {             
        errorHandler(error);
        return null;
    }
}

//--------------------------------------------------------
export async function addProduct(product) {
    
    const url = `https://sukkergris.onrender.com/webshop/testdummy/products?key=${groupkey}`;
    
    const cfg = {
        method: "POST",
        body: product  //NB! product as formdata
    }
    
    try {

        const data = await sendRequest(url, cfg);
        return data;
        
    } catch (error) {             
        errorHandler(error);
        return null;
    }
}

//---------------------------------------------------------

//add more functions below when needed





