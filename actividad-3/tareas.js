// Clase Tarea
class Tarea {
  // Metodo constructor: Es el metdo que se ejecuta cuando se crea el objeto con la instruccion NEW
  // La palabra en azul "constructor" es una palabra reservada de JS, no es una convención o un estandar de los programdores
  constructor(numeroTarea, descripcionTarea) {
    // las letiables que comienzan con la palabra reservada this corresponden a las propiedades de la clase
    this.id = numeroTarea;
    this.descripcion = descripcionTarea;
    this.estado = "Pendiente";
    // objeto = new NombreDeUnaClase()
    this.fechaCreacion = new Date();
    this.responsable ="Jefe de Proyecto";
  }


  // metodo cambiarEstado():
  cambiarEstado() {
    if (this.estado === "Pendiente") {
      this.estado = "Completada";
    } else {
      this.estado = "Pendiente";
    }
  }
}

// Clase GestorTareas
class GestorTareas {
  constructor() {
    // inicializa el arreglo tareas vacio, sin ningun elemento
    this.tareas = [];
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
  }

  eliminarTarea(id) {
    for (let i = 0; i < this.tareas.length; i++) {
      if (this.tareas[i].id === id) {
        this.tareas.splice(i, 1);
        break;
      }
    }
  }
}

// letiables globales

let gestor = new GestorTareas(); // se crea el objeto llamado gestor y su class es GestorTarea
let idActual = 1;

// implementar submit
document.getElementById("formTareas").addEventListener("submit", function (e) {
  e.preventDefault(); // evita que la página se recargue
  agregarNuevaTarea();
});


let txtDescripcion = document.getElementById("txtDescripcion");

txtDescripcion.addEventListener("keyup", function () {
  if (txtDescripcion.value.trim() !== "") {
    txtDescripcion.classList.add("border-success");
    txtDescripcion.classList.remove("border-danger");
  } else {
    txtDescripcion.classList.add("border-danger");
    txtDescripcion.classList.remove("border-success");
  }
});


// Funciones simples
function agregarNuevaTarea() {
  let texto = document.getElementById("txtDescripcion").value;

  if (texto === "") {
    return;
  }
    // objeto = new Clase()
  let tarea = new Tarea(idActual, texto);
  idActual = idActual + 1;

  // como es posible que la letiable gestor tenga asociada un metodo llamado agregarTarea()
  // estamos invocando al metodo agregarTarea de la class  GestorTareas
  // esto es posible puesto que el objeto gestor fue creado con la instruccion new GestorTarea()
  gestor.agregarTarea(tarea);
  mostrarTareas();

  document.getElementById("txtDescripcion").value = "";
}

function mostrarTareas() {
  let lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  for (let i = 0; i < gestor.tareas.length; i++) {
    let t = gestor.tareas[i];

    lista.innerHTML = lista.innerHTML +
      "<li class='list-group-item d-flex justify-content-between'>" +
        "<span>" + t.descripcion + " - " + t.estado + " - " + t.responsable + "</span>" +
        "<div>" +
          "<button class='btn btn-success btn-sm' onclick='cambiarEstado(" + t.id + ")'>Cambiar Estado</button> " +
          "<button class='btn btn-danger btn-sm' onclick='eliminar(" + t.id + ")'>Eliminar Tarea</button>" +
        "</div>" +
      "</li>";
  }

  // EVENTOS DE MOUSE
  let items = document.querySelectorAll("#listaTareas li");

  for (let j = 0; j < items.length; j++) {
    items[j].addEventListener("mouseover", function () {
      this.classList.add("list-group-item-info");
    });

    items[j].addEventListener("mouseout", function () {
      this.classList.remove("list-group-item-info");
    });
  }
}


function cambiarEstado(id) {
  for (let i = 0; i < gestor.tareas.length; i++) {
    if (gestor.tareas[i].id === id) {
      gestor.tareas[i].cambiarEstado();
      break;
    }
  }
  mostrarTareas();
}

function eliminar(id) {
  gestor.eliminarTarea(id);
  mostrarTareas();
}
