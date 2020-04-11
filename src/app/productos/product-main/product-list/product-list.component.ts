import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  ids: number[];
  productSubscription = new Subscription();
  idsSubscription = new Subscription();
  productMode = true;
  disableAddBtn = true;

  query: string;
  shownProducts: Product[];

  checkedProducts: number[];

  constructor(private productService: ProductsService, private route: ActivatedRoute, private location: Location) {
    this.productList = productService.getProducts();
    this.ids = productService.getIds();
    if (this.location.isCurrentPathEqualTo('/monitoreo')) {
      this.productMode = false;
      this.productList = [];
      this.ids.forEach(id => {
        this.productList.push(this.productService.getProduct(id));
      });
    }
    this.shownProducts = this.productList;
    this.checkedProducts = [];
  }

  searchProducts() {
    this.shownProducts = this.productList.filter(product => {
      // tslint:disable-next-line: max-line-length
      return product.nombre.toUpperCase().includes(this.query.toUpperCase()) || product.descripcion.toUpperCase().includes(this.query.toUpperCase());
    });
  }

  addIds() {
    this.checkedProducts.forEach(uid => {
      this.productService.addId(uid);
    });
  }

  updateCheckedProducts(event) {
    if (event.checked) {
      if (!this.checkedProducts.includes(event.uid)) {
        this.checkedProducts.push(event.uid);
      }
    } else {
      if (this.checkedProducts.includes(event.uid)) {
        this.checkedProducts.splice(this.checkedProducts.indexOf(event.uid), 1);
      }
    }
  }

  ngOnInit(): void {
    this.productSubscription = this.productService.productSubject.subscribe(data => {
      this.productList = data;
      this.shownProducts = this.productList;
    });
    this.idsSubscription = this.productService.idsSubject.subscribe(data => {
      this.ids = data;
      if (!this.productMode) {
        this.productList = [];
        this.ids.forEach(id => {
          this.productList.push(this.productService.getProduct(id));
        });
        this.shownProducts = this.productList;
      }
    });
  }

}
