import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Especificacion } from '../../Product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  editMode = true;
  uid: number;
  product: Product;
  brands = ['LG', 'Sony', 'Alienware', 'HP', 'Samsung', 'Apple', 'Hamilton Beach'];

  submit(form: NgForm) {
    if (this.editMode) {
      this.productService.updateProduct(this.uid, this.product.nombre, this.product.marca, this.product.descripcion,
      this.product.precio, this.product.existencia, this.product.especificacion);
    } else {
      const created = this.productService.createProduct(this.product.uid, this.product.nombre, this.product.marca,
      this.product.descripcion, this.product.precio, this.product.existencia, this.product.especificacion);
      if (!created) {
        window.alert('Producto no creado, ya existe un producto con ese ID');
      }
    }
  }

  addDescription(atributo: string, valor: string, unidad: string) {
    this.product.especificacion.push(new Especificacion(atributo, valor, unidad));
  }

  deleteDescription(index: number) {
    // tslint:disable-next-line: triple-equals
      this.product.especificacion.splice(index, 1);
  }

  constructor(private productService: ProductsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.uid = params.id);
    // tslint:disable-next-line: triple-equals
    if (this.uid != undefined) {
      this.product = this.productService.getProduct(this.uid);
    } else {
      this.editMode = false;
      this.product = new Product(null, '', '', '', null, null, []);
    }
  }

  ngOnInit(): void {
  }
}
