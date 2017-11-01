import { Product } from "./models/product";
import { MdPaginator, Sort } from "@angular/material";

/* 
    ABOUT ME: The purpose of this class is to define some methods that will
    help us when filtering and sorting products within the admin-products.component.ts
    file.
*/
export class ProductsFilterHelper {
    private allProducts:Product[] = [];
    private paginator:MdPaginator;
    constructor(mdPaginator?:MdPaginator) {
        this.paginator = (mdPaginator)?(mdPaginator):(null);
    }

    initializeAllProducts(products:Product[]) {
        this.allProducts = products;
    }
    
    private compare(productA:string|number,productB:string|number,isAsc:boolean):number {
        return (productA < productB ? -1 : 1) * (isAsc ? 1 : -1);
    }

    getSortedProducts(userSelected:Sort,productsToSort:Product[]):Product[] {
        return productsToSort.sort((a:Product,b:Product) => {
            const isAsc:boolean = userSelected.direction == "asc";
            switch(userSelected.active) {
                case "title":return this.compare(a.title,b.title,isAsc);
                case "price":return this.compare(a.price,b.price,isAsc);
            }
        });
    }

    getFilteredProducts(userSearch:string):Product[] {
        //filter based on user search
        const tempProducts:Product[] = this.allProducts.filter((eachProduct:Product) => {
            //admin can search by title or price, so we concatenate those.
            const searchString:string = (eachProduct.title+eachProduct.price).toLowerCase();
            return searchString.indexOf(userSearch) != -1;
        });

        //set up indeces to grab the correct number of products based on page.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        const endAtIndex = startIndex + (this.paginator.pageSize - 1);
      
        //filter based on indeces..
        return tempProducts.filter((eachProduct:Product,index:number) => {
            return index >= startIndex && index <= endAtIndex;
        });
    }
}
