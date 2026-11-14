
import { errorHandler } from "./error_handler.mjs";
import { CategoryArrayModel, ProductArrayModel, ProductModel } from "./models.mjs";
import { sendRequest, createBasicAuthString } from "./utils.mjs";

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

    const url = `https://sukkergris.onrender.com/webshop/chocolates?key=${groupkey}`;

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
    const url = `https://sukkergris.onrender.com/webshop/chocolates?id=${id}&key=${groupkey}`;

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

    const url = `https://sukkergris.onrender.com/webshop/chocolates?key=${groupkey}`;

    const cfg = {
        method: "POST",
        body: product,  //NB! product as formdata
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
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

export function getProductThumbUrl(product) { // Not async because it only builds a URL, without fetching data.
    let imageKey = groupkey;
    if (product.static === true) {
        imageKey = "GFTPOE21";
    }
    const imageUrl = `https://sukkergris.onrender.com/images/${imageKey}/small/${product.thumb}`;
    return imageUrl;
}

export function getProductImageUrl(product) { // Not async because it only builds a URL, without fetching data.
    let imageKey = groupkey;
    if (product.static === true) {
        imageKey = "GFTPOE21";
    }
    const imageUrl = `https://sukkergris.onrender.com/images/${imageKey}/large/${product.image}`;
    return imageUrl;
}

export async function adminLogin(username, password) {
    const adminLoginUrl = `https://sukkergris.onrender.com/users/adminlogin?key=${groupkey}`;
    const cfg = {
        method: "POST",
        headers: {
            "Authorization": createBasicAuthString(username, password)
        }
    }
    try {
        const loginData = await sendRequest(adminLoginUrl, cfg);
        return loginData;
    } catch (error) {
        errorHandler(error);
        return [];
    }
}