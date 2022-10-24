class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascota = [];
    }

    getFullName(){
        console.log( `El nombre del usuario es ${this.nombre} ${this.apellido}`)
    }
    addMascota(nuevamascota){
        this.mascota = [...this.mascota, nuevamascota]
    }
    countMascotas(){
        console.log(this.mascota.length)
    }
    addBook(nombre, autor){
        this.libros = [...this.libros, {nombre: nombre, autor: autor}]
    }
    getBookNames(){
        console.log(this.libros.map(a => a.nombre))
    }

}

const p = new Usuario("Matias", "Bianchi");

p.getFullName();
p.addMascota("Ipa");
p.addMascota("Lola");
p.addMascota("Charo");
p.countMascotas();
p.addBook("El señor de los anillos", "Tolkien");
p.addBook("El Silmarillion", "Tolkien");
p.addBook("Harry Potter", "Rowling");
p.getBookNames();
