import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/productos/products.service';
import { Product } from 'src/app/productos/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line: no-input-rename
  @Input('productMode') productMode: boolean;
  @Output() checked = new EventEmitter();

  constructor(private productService: ProductsService) { }
  deleteProduct(uid: number) {
    this.productService.deleteProduct(uid);
  }

  deleteId(uid: number) {
    this.productService.deleteId(uid);
  }

  checkCB(event) {
    this.checked.emit({uid: this.product.uid, checked: event.target.checked});
  }

  ngOnInit(): void {
  }

}
