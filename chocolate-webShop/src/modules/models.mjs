// Strukturerer data fra serveren til et mer praktisk format for bruk i appen

//============================================
export class ProductModel {

    //---------------------------------------
    constructor(dataFromServer) {
        this.data = this.convertObj(dataFromServer);
    }

    //---------------------------------------    
    convertObj(dataObj) {

        return {
            id: dataObj.id,
            catId: dataObj.category_id,
            name: dataObj.chocoName,
            descr: dataObj.descr,
            price: Number(dataObj.price),
            thumb: dataObj.thumb,
            image: dataObj.image,
            static: dataObj.static,
            categoryName: dataObj.category_name,
            shortDescr: dataObj.shortDescr,
            discount: Number(dataObj.discount),
            stock: Number(dataObj.stock),
            expectedShipped: dataObj.expected_shipped,
            rating: dataObj.rating == null ? null : Number(dataObj.rating), // Konverterer rating til et tall hvis det finnes, ellers null
            numberOfRatings: Number(dataObj.number_of_ratings),

            // add more properties if needed          
        }
    }
}

//============================================
export class ProductArrayModel {

    //---------------------------------------
    constructor(dataFromServer) {

        this.data = [];

        for (let dataObj of dataFromServer) {
            const obj = this.convertObj(dataObj);
            this.data.push(obj);
        }
    }

    //---------------------------------------    
    convertObj(dataObj) {

        return {
            id: dataObj.id,
            catId: dataObj.category_id,
            name: dataObj.chocoName,
            descr: dataObj.shortDescr,
            price: Number(dataObj.price),
            thumb: dataObj.thumb,
            static: dataObj.static

            // add more properties if needed             
        }
    }
}

//============================================
export class CategoryArrayModel {

    //---------------------------------------
    constructor(dataFromServer) {

        this.data = [];

        for (let dataObj of dataFromServer) {
            const obj = this.convertObj(dataObj);
            this.data.push(obj);
        }
    }

    //---------------------------------------    
    convertObj(dataObj) {

        return {
            id: dataObj.id,
            catName: dataObj.category_name,
            catDescr: dataObj.description

            // add more properties if needed             
        }
    }
}

//======================================

// Add more model-classes below when needed, e.g.:
// Order, User, Comment...
