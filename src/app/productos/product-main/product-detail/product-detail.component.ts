import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../../Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.product = this.productService.getProduct(params.id));
  }

}
