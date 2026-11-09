// Controller for admin app

import { getCategories, getAllProducts, addProduct, getProductsByCategory, adminLogin } from "../api_service.mjs";
import { CategoryView, ProductForm, ProductView } from "./views/admin_product_views.mjs";
import { OrderView } from "./views/admin_order_views.mjs";
import { UserView } from "./views/admin_user_views.mjs";
import { ReviewView } from "./views/admin_review_views.mjs";
import { showMessage } from "../msg_handler.mjs";

//init -------------------------------------------
const catView = new CategoryView();
const prodView = new ProductView();
const prodForm = new ProductForm();
const orderView = new OrderView();
const userView = new UserView();
const reviewView = new ReviewView();

const viewMap = {
    "catview": catView,
    "prodview": prodView,
    "prodform": prodForm,
    "orderview": orderView,
    "userview": userView,
    "reviewview": reviewView
}
const viewContainer = document.getElementById("viewContainer");
const btnAddProd = document.getElementById('btnAddProd');
const btnHome = document.getElementById('btnHome');
const btnLogin = document.getElementById("btnLogin");
const adminNav = document.getElementById("adminNav");
const adminLoginForm = document.getElementById("adminLoginForm");
const btnProducts = document.getElementById("btnProducts");
const btnOrders = document.getElementById("btnOrders");
const btnUsers = document.getElementById("btnUsers");
const btnReviews = document.getElementById("btnReviews");


//show categories at startup
// const categories = await getCategories();
// catView.refresh(categories);

//------------------------------------------------
function navigateTo(viewName) {
    viewContainer.replaceChildren();
    viewContainer.appendChild(viewMap[viewName]);
}

//------------------------------------------------
// btnHome.addEventListener('click', function (evt) {
//     navigateTo("catview");
// });

//------------------------------------------------
// btnAddProd.addEventListener('click', function (evt) {
//     navigateTo("prodform");
// });

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

    if (loginData && loginData.logindata.token) {
        sessionStorage.setItem("adminToken", loginData.logindata.token);
        adminNav.hidden = false;
        adminLoginForm.hidden = true;
        // navigateTo("catview");
        setActiveTab(btnProducts);
    }
});

//-------------------navigation-----------------------------

btnProducts.addEventListener('click', function (evt) {
    navigateTo("prodview");
    setActiveTab(btnProducts);
});

btnOrders.addEventListener('click', function (evt) {
    navigateTo("orderview");
    setActiveTab(btnOrders);
});

btnUsers.addEventListener('click', function (evt) {
    navigateTo("userview");
    setActiveTab(btnUsers);
});

btnReviews.addEventListener('click', function (evt) {
    navigateTo("reviewview");
    setActiveTab(btnReviews);
});

function setActiveTab(selectedButton) {
    adminNav.querySelectorAll("button").forEach(button => {
        button.classList.remove("active");
    });
    selectedButton.classList.add("active");
};