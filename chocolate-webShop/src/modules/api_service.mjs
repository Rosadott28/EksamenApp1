
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
export async function getShippingMethods() {
    const url = `https://sukkergris.onrender.com/logistics/shippingtypes?key=${groupkey}`;

    try {
        const dataFromServer = await sendRequest(url);
        return dataFromServer;

    } catch (error) {
        errorHandler(error);
        return [];
    }
}

//--------------------------------------------------------
export async function addOrder(order) {
    const url = `https://sukkergris.onrender.com/webshop/orders?key=${groupkey}`;

    const cfg = {
        method: "POST", //sender bestillingen til serveren
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    };

    try {
        const dataFromServer = await sendRequest(url, cfg);
        return dataFromServer;

    } catch (error) {
        errorHandler(error);
        return null;
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
export async function getAllOrders() {

    const url = `https://sukkergris.onrender.com/webshop/orders?key=${groupkey}`;
    const cfg = {
        method: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
    }
    try {

        const dataFromServer = await sendRequest(url, cfg);
        return dataFromServer;

    } catch (error) {
        errorHandler(error);
        return [];
    }
    
}

//--------------------------------------------------------
export async function getUsers() {

    const url = `https://sukkergris.onrender.com/users?key=${groupkey}`;
    const cfg = {
        method: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("userToken")
        }
    }
    try {

        const dataFromServer = await sendRequest(url, cfg);
        return dataFromServer;

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
        return null;
    }
}

//--------------------------------------------------------
export async function getProductComments(productId) {
    const url = `https://sukkergris.onrender.com/webshop/comments?key=${groupkey}&product_id=${productId}`;

    try {

        const dataFromServer = await sendRequest(url);
        return dataFromServer;

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
        body: product,  //NB! product as formdata,
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
//--------------------------------------------------------
export async function registerUser(user) {

    const url = `https://sukkergris.onrender.com/users?key=${groupkey}`;

    const cfg = {
        method: "POST",
        body: user,  
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

export async function updateProduct(product) {
    const url = `https://sukkergris.onrender.com/webshop/chocolates?key=${groupkey}`;

    const cfg = {
        method: "PUT",
        body: product,  //NB! product as formdata,
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
export async function deleteProduct(productId) {
    const url = `https://sukkergris.onrender.com/webshop/chocolates?key=${groupkey}&id=${productId}`;

    const cfg = {
        method: "DELETE",
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
export async function deleteOrder(orderId) {
    const url = `https://sukkergris.onrender.com/webshop/orders?key=${groupkey}&id=${orderId}`;

    const cfg = {
        method: "DELETE",
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

//---------------------------------------------------------
export function getProductThumbUrl(product) { // Not async because it only builds a URL, without fetching data.
    let imageKey = groupkey;
    if (product.static === true) {
        imageKey = "GFTPOE21";
    }
    const imageUrl = `https://sukkergris.onrender.com/images/${imageKey}/small/${product.thumb}`;
    return imageUrl;
}

//---------------------------------------------------------
export function getProductImageUrl(product) { // Not async because it only builds a URL, without fetching data.
    let imageKey = groupkey;
    if (product.static === true) {
        imageKey = "GFTPOE21";
    }
    const imageUrl = `https://sukkergris.onrender.com/images/${imageKey}/large/${product.image}`;
    return imageUrl;
}

//---------------------------------------------------------
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
        return null;
    }
}

//---------------------------------------------------------
export async function userLogin(username, password) {
    const userLoginUrl = `https://sukkergris.onrender.com/users/login?key=${groupkey}`;
    const cfg = {
        method: "POST",
        headers: {
            "Authorization": createBasicAuthString(username, password)
        }
    }
    try {
        const loginData = await sendRequest(userLoginUrl, cfg);
        return loginData;
    } catch (error) {
        errorHandler(error);
        return null;
    }
}

export function getUserThumbUrl(filename) {
  return `https://sukkergris.onrender.com/images/${groupkey}/users/${filename}`;
} // bruker bildenavnet lagret i sessionstorage