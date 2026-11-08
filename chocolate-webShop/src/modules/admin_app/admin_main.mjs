// Controller for admin app

import { getCategories, getAllProducts, addProduct, getProductsByCategory, adminLogin } from "../api_service.mjs";
import { CategoryView, ProductForm, ProductView } from "./views/admin_product_views.mjs";
import { showMessage } from "../msg_handler.mjs";

//init -------------------------------------------
const catView = new CategoryView();
const prodView = new ProductView();
const prodForm = new ProductForm();

const viewMap = {
    "catview": catView,
    "prodview": prodView,
    "prodform": prodForm
}
const viewContainer = document.getElementById("viewContainer");
const btnAddProd = document.getElementById('btnAddProd');
const btnHome = document.getElementById('btnHome');
const btnLogin = document.getElementById("btnLogin");
const adminNav = document.getElementById("adminNav");
const adminLoginForm = document.getElementById("adminLoginForm");


//show categories at startup
const categories = await getCategories();
catView.refresh(categories);
navigateTo("catview");

//------------------------------------------------
function navigateTo(viewName) {
    viewContainer.innerHTML = "";
    viewContainer.appendChild(viewMap[viewName]);
}

//------------------------------------------------
btnHome.addEventListener('click', function (evt) {
    navigateTo("catview");
});

//------------------------------------------------
btnAddProd.addEventListener('click', function (evt) {
    navigateTo("prodform");
});

//------------------------------------------------
catView.addEventListener('categoryselect', async function (evt) {
    const categoryId = evt.categoryData.id;
    const products = await getProductsByCategory(categoryId);
    prodView.refresh(products);
    navigateTo("prodview");
});

//------------------------------------------------
prodForm.addEventListener('addproduct', async function (evt) {
    const result = await addProduct(evt.productForm);
    if (result) {
        showMessage("Insert OK!")
    };
});

//-------------------Admin logIn-----------------------------

btnLogin.addEventListener('click', async function (evt) {
    const username = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;
    const loginData = await adminLogin(username, password);

    if (loginData && loginData.token) {
        sessionStorage.setItem("adminToken", loginData.token);
        adminNav.hidden = false;
        adminLoginForm.hidden = true;
    }
});



