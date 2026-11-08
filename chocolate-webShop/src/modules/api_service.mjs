
import { errorHandler } from "./error_handler.mjs";
import { CategoryArrayModel, ProductArrayModel, ProductModel } from "./models.mjs";
import { sendRequest } from "./utils.mjs";

const groupkey = "NHKOZC85"; // Ebba og Benedicte sin groupkey

//--------------------------------------------------------
export async function getCategories() {

    const url = `https://sukkergris.onrender.com/webshop/categories?key=${groupkey}`;

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

    const url = `https://sukkergris.onrender.com/webshop/webshop/chocolates?key=${groupkey}`;

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
    const url = `https://sukkergris.onrender.com/webshop/chocolates?catID=${catId}&key=${groupkey}`;

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
    const url = `https://sukkergris.onrender.com/webshop/webshop/chocolates?id=${id}&key=${groupkey}`;

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

    const url = `https://sukkergris.onrender.com/webshop/webshop/chocolates?key=${groupkey}`;

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

export async function getProductsBySearch(searchWord) {
    const url = `https://sukkergris.onrender.com/webshop/chocolates?search=${encodeURIComponent(searchWord)}&key=${groupkey}`;

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

export async function getProductThunbUrl(product) {
    let imageKey = groupkey;
    if (product.static === true) {
        imageKey = "GFTPOE21";
    }
    const imageUrl = `https://sukkergris.onrender.com/images/${imageKey}/small/${product.thumb}`;
    return imageUrl;
}



