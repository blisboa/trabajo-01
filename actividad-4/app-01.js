let boton = document.getElementById("btnAgregar");
let input = document.getElementById("txtTarea");
let notificacion = document.getElementById("notificacion");

boton.addEventListener("click", function () {
  let texto = input.value.trim();

  if (texto === "") {
    return;
  }

  procesarTareaConRetardo(texto);
  input.value = "";
});

/* FUNCIÓN ASÍNCRONA */
function procesarTareaConRetardo(tarea) {
  notificacion.style.display = "block";
  notificacion.className = "alert alert-warning";
  notificacion.textContent = "Procesando tarea...";

  setTimeout(function () {
    notificacion.className = "alert alert-success";
    notificacion.textContent = "Tarea agregada: " + tarea;
  }, 4000); // 2 segundos
}
