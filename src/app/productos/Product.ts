export class Product {
    uid: number;
    nombre: string;
    marca: string;
    descripcion: string;
    precio: number;
    existencia: number;
    especificacion: Especificacion[];

    // tslint:disable-next-line: max-line-length
    constructor(uid: number, nombre: string, marca: string, descripcion: string, precio: number, existencia: number, especificacion: Especificacion[]) {
        this.uid = uid;
        this.nombre = nombre;
        this.marca = marca;
        this.descripcion = descripcion;
        this.precio = precio;
        this.existencia = existencia;
        this.especificacion = especificacion;
    }
}

export class Especificacion {
    atributo: string;
    valor: string;
    unidad: string;
    constructor(atributo: string, valor: any, unidad: string){
        this.atributo = atributo;
        this.valor = valor;
        this.unidad = unidad;
    }
}
