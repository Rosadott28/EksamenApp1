//===============================================
export class CategoryView extends HTMLElement {
    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    //-----------------------------
    refresh(data) {
        if (!data) {
            return;
        } //if an error is catched in api_service

        this.shadow.innerHTML = "";
        for (let value of data) {
            const div = document.createElement("div");
            div.innerHTML = `
                <h2>${value.catName}</h2>
                <p>${value.catDescr}</p><hr>               
            `;
            this.shadow.appendChild(div);

            div.addEventListener("click", (evt) => {
                const catEvt = new CustomEvent("categoryselect", {
                    composed: true,
                    bubbles: true,
                });
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
        this.shadow = this.attachShadow({ mode: "open" });
    }

    //-----------------------------
    refresh(data) {
        if (!data) {
            return;
        } //if an error is catched in api_service

        this.shadow.replaceChildren();

        const addProductButton = document.createElement("button");
        const productTableStyle = document.createElement("style");
        const productTable = document.createElement("table");
        const productTableBody = document.createElement("tbody");
        const tableHeaderSection = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const productNameHeader = document.createElement("th");
        const priceNameHeader = document.createElement("th");
        const actionNameHeader = document.createElement("th");

        addProductButton.textContent = "Add product";
        productNameHeader.textContent = "Product name";
        priceNameHeader.textContent = "Price";
        actionNameHeader.textContent = "Action";
        productTableStyle.textContent = `
        .edit-button, .delete-button {
            border-radius: 999px;
            padding: 6px 14px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 3px 8px #00000020;
            }
            .edit-button {
            background-color: var(--ivory);
            border: 2px solid var(--powder);
            color: var(--powder);
        } 
            .delete-button {
            background-color: var(--ivory);
            border: 2px solid #B42318;
            color: #B42318 ;
        }
        :host {
                display: block;
                width: 100%;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                text-align: left;
                padding: 4px 8px;
            }
            td {
                padding: 4px 8px;
            }
          thead {
                background-color: var(--truffle);
                color: var(--ivory);
            }

            tbody tr:nth-child(odd) {
                background-color: var(--ivory);
            }

            tbody tr:nth-child(even) {
                background-color: var(--pearl);
            }`;

        headerRow.appendChild(productNameHeader);
        headerRow.appendChild(priceNameHeader);
        headerRow.appendChild(actionNameHeader);
        tableHeaderSection.appendChild(headerRow);
        productTable.appendChild(tableHeaderSection);
        productTable.appendChild(productTableBody);

        this.shadow.appendChild(addProductButton);
        this.shadow.appendChild(productTable);
        this.shadow.appendChild(productTableStyle);

        data.forEach((product) => {
            const productRow = document.createElement("tr");
            const productNameCell = document.createElement("td");
            const productPriceCell = document.createElement("td");
            const productActionCell = document.createElement("td");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            editButton.classList.add("edit-button");
            deleteButton.classList.add("delete-button");

            productNameCell.textContent = product.name;
            productPriceCell.textContent = "kr " + product.price + ",-";
            editButton.textContent = "Edit";
            deleteButton.textContent = "Delete";

            productTableBody.appendChild(productRow);
            productRow.appendChild(productNameCell);
            productRow.appendChild(productPriceCell);
            productRow.appendChild(productActionCell);
            productActionCell.appendChild(editButton);
            productActionCell.appendChild(deleteButton);
        });
        addProductButton.addEventListener("click", (evt) => {
            const addProdEvent = new CustomEvent("showaddproduct", {
                composed: true,
                bubbles: true,
            });
            this.shadow.dispatchEvent(addProdEvent);
        });
    }
}

//===============================================
export class ProductForm extends HTMLElement {
    //-----------------------------
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.innerHTML = `
            <h2>Add product</h2>
            <hr>
            <form id="theForm">
                <label for="productName">Product name</label><br>
                <input name="name" id="productName" type="text" required><br>

                <label for="productPrice">Price</label><br>
                <input name="price" id="productPrice" type="number" min="0" step="0.01"><br>

                <label for="categoryId">Category ID</label><br>
                <input name="catID" id="categoryId" type="number" min="1" max="7"><br>

                <label for="productHeading">Heading</label><br>
                <input name="heading" id="productHeading" type="text"><br>

                <label for="productDescription">Description</label><br>
                <textarea name="description" id="productDescription" rows="3"></textarea><br>

                <label for="stock">Stock</label><br>
                <input name="stock" id="stock" type="number" min="0" step="1"><br>

                <label for="productImage">Image</label><br>
                <input name="img_file" id="productImage" type="file" accept=".png, .jpg, .jpeg"><br><hr>
                
                <button type="button" id="cancelAddProduct">Cancel</button>
                <input type="submit" value="Add product">
            </form>
        `;
        const theForm = this.shadow.querySelector("#theForm");

        this.shadow.querySelector("#cancelAddProduct").addEventListener("click", (evt) => {
            theForm.reset();
            this.dispatchEvent(new CustomEvent("canceladdproduct"));
        });
        

        theForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const addProdEvent = new CustomEvent("addproduct", {
                composed: true,
                bubbles: true,
            });
            addProdEvent.productForm = new FormData(theForm);
            this.shadow.dispatchEvent(addProdEvent);
        });
    }
}

//===============================================
customElements.define("category-view", CategoryView);
customElements.define("product-view", ProductView);
customElements.define("product-form", ProductForm);
