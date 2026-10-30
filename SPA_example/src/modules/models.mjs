//============================================
export class ProductModel {
    
    //---------------------------------------
    constructor(dataFromServer) {
        this.data = this.convertObj(dataFromServer);        
    }

    //---------------------------------------    
    convertObj(dataObj) { 

        return {
            id:         dataObj.id,
            catId:      dataObj.category_id,
            name:       dataObj.name,
            descr:      dataObj.description,            
            price:      dataObj.price

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
            id:         dataObj.id,
            catId:      dataObj.category_id,
            name:       dataObj.name,
            descr:      dataObj.description,            
            price:      dataObj.price

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
            id:         dataObj.id,
            catName:    dataObj.category_name,
            catDescr:   dataObj.description 

            // add more properties if needed             
        }
    }    
}

//======================================

// Add more model-classes below when needed, e.g.:
// Order, User, Comment...
