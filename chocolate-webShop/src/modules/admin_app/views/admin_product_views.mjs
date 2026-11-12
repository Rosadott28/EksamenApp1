
//===============================================
export class CategoryView extends HTMLElement {

    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    //-----------------------------
    refresh(data) {       

        if (!data) {return} //if an error is catched in api_service               

        this.shadow.innerHTML = "";
        for (let value of data) {            
            const div = document.createElement("div");
            div.innerHTML = `
                <h2>${value.catName}</h2>
                <p>${value.catDescr}</p><hr>               
            `;
            this.shadow.appendChild(div);

            div.addEventListener('click', evt => {
                const catEvt = new CustomEvent("categoryselect", {composed: true, bubbles:true});
                catEvt.categoryData = value;
                this.shadow.dispatchEvent(catEvt);
            });
        }
    }
}

//===============================================
export class ProductView extends HTMLElement {

    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    //-----------------------------
    refresh(data) {

        if (!data) {return} //if an error is catched in api_service         

        this.replaceChildren();
        data.forEach((product) => {            
            const div = document.createElement("div");
            const productName = document.createElement("h2");
            const productDescription = document.createElement("p");
            const productPrice = document.createElement("p");

            productName.textContent = product.name;
            div.appendChild(productName);
    
            productDescription.textContent = product.descr;
            div.appendChild(productDescription);

            productPrice.textContent = "kr " + product.price + ",-";
            div.appendChild(productPrice);

            this.shadow.appendChild(div);
        })
    }
}

//===============================================
export class ProductForm extends HTMLElement {

    //-----------------------------
    constructor() {
        super();

        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.innerHTML = `
            <h2>Add product</h2>
            <hr>
            <form id="theForm">
                <input name="name" placeholder="Product name"><br>
                <input name="description" placeholder="description"><br>
                <input name="category_id" placeholder="Category ID (1-7)"><br>
                <input name="details" placeholder="Details"><br>
                <input name="price" placeholder="Price"><br>
                <input name="thumb" type="file"><br><hr>
                
                <input type="submit" value="Add dummy product">
            </form>
        `;
        const theForm = this.shadow.querySelector("#theForm");
        
        theForm.addEventListener('submit', evt => {
            evt.preventDefault();
            const addProdEvent = new CustomEvent("addproduct", {composed: true, bubbles: true});
            addProdEvent.productForm = new FormData(theForm);
            this.shadow.dispatchEvent(addProdEvent);
        });
    }
}    

//===============================================
customElements.define("category-view", CategoryView);
customElements.define("product-view", ProductView);
customElements.define("product-form", ProductForm);