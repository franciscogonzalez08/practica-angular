import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  monitoredIds: number[];
  productSubject = new Subject<Product[]>();
  idsSubject = new Subject<number[]>();

  constructor() {
    this.products = [
      // tslint:disable-next-line: max-line-length
      new Product(100, 'Cafetera para 10 tazas con dispensador', 'Hamilton Beach', 'Prepara café caliente o helado. Olvídese de la jarra - Cafetera dispensadora para 10 tazas sin jarra, apagado automático de 0 a 4 horas, fácil de llenar con cómoda asa de cesta de preparación, el café permanece fresco por más tiempo y permite dispensar el café con una sola mano.', 1169, 30, [new Especificacion('Filtro de agua', '1', 'pieza'), new Especificacion('Acero inoxidable', '', ''), new Especificacion('Programable', '', '')]),
      // tslint:disable-next-line: max-line-length
      new Product(101, 'Desktop Alienware Aurora R8', 'Alienware', 'Desktop Alienware AURORA R8: Lleva el juego a nuevas alturas con esta computadora de escritorio de gaming Dell Alienware AURORA R8. Su tarjeta gráfica NVIDIA GeForce RTX 2080 reproduce sin problemas imágenes en 3D durante tus juegos favoritos, y la unidad de estado sólido de 256 GB arranca el sistema rápidamente, mientras que la unidad de disco duro de 2TB ofrece gran capacidad de almacenamiento a largo plazo. Esta computadora de escritorio Dell Alienware AURORA R8 tiene un procesador Intel Core i7 de novena generación y 16GB de RAM DDR4 para realizar múltiples tareas de manera eficiente. Tu equipo incluye Monitor Alienware AW2518H, teclado Alienware MM y Mouse Alienware Óptico Standard.', 71499.00, 2, [new Especificacion('Memoria RAM', '16', 'GB'), new Especificacion('HDD', '2', 'TB'), new Especificacion('SSD', '256', 'GB')])
    ];
    this.monitoredIds = [];
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  getProduct(uid: number): Product {
    // tslint:disable-next-line: triple-equals
    return JSON.parse(JSON.stringify(this.products.find(product => product.uid == uid)));
  }

  // tslint:disable-next-line: max-line-length
  updateProduct(uid: number, nombre: string, marca: string, descripcion: string, precio: number, existencia: number, especificacion: Especificacion[]) {
    // tslint:disable-next-line: triple-equals
    const productIndex = this.products.findIndex(product => product.uid == uid);
    this.products[productIndex].nombre = nombre;
    this.products[productIndex].marca = marca;
    this.products[productIndex].descripcion = descripcion;
    this.products[productIndex].precio = precio;
    this.products[productIndex].existencia = existencia;
    this.products[productIndex].especificacion = especificacion;
  }

  deleteProduct(uid: number) {
    // tslint:disable-next-line: triple-equals
    const productIndex = this.products.findIndex(product => product.uid == uid);
    this.products.splice(productIndex, 1);
    this.productSubject.next(this.getProducts());

    this.deleteId(uid);
  }

  // tslint:disable-next-line: max-line-length
  createProduct(uid: number, nombre: string, marca: string, descripcion: string, precio: number, existencia: number, especificacion: Especificacion[]): boolean {
    // tslint:disable-next-line: triple-equals
    if (this.products.find(product => product.uid == uid) == undefined) {
      this.products.push(new Product(uid, nombre, marca, descripcion, precio, existencia, especificacion));
      return true;
    } else {
      return false;
    }
  }


  getIds(): number[] {
    return this.monitoredIds;
  }

  addId(uid: number) {
    if (!this.monitoredIds.includes(uid)){
      this.monitoredIds.push(uid);
      // Actualizar monitoreados
    }
  }


  deleteId(uid: number) {
    const index = this.monitoredIds.indexOf(uid);
    // tslint:disable-next-line: triple-equals
    if (index != -1) {
      this.monitoredIds.splice(index, 1);
      this.idsSubject.next(this.getIds());
    }

  }


}
