import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { debounce } from 'lodash';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit, OnChanges {
    @Input() params;
    @Input() showSupplier = false;

    products = [];
  constructor(
      private productsService: ProductService,
  ) {
      this.filterSearch = debounce(this.filterSearch, 350);
  }

    ngOnInit(): void {
        console.log('products');
        this.filterSearch();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes.params) {
            this.filterSearch();
        }
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.productsService.search(this.params).subscribe(data => {
            console.log(data.data)
            this.products = data.data.data;

            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }


}
