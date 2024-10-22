function agregarTarea() {
    let nuevaTareasTexto = document.getElementById("nuevasTareas").value
    if (nuevaTareasTexto === "") {
        Swal.fire({
            title: "Debes ingresar una tarea",
            icon: "warning"
          });
        return
    }

    let nuevasTareas = document.createElement("li")
    nuevasTareas.textContent = nuevaTareasTexto + " "
    let botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.onclick = function () {
        nuevasTareas.remove()
        eliminarTareas(nuevaTareasTexto)
    }

    nuevasTareas.appendChild(botonEliminar)
    document.getElementById("lista").appendChild(nuevasTareas)
    guardarTareas(nuevaTareasTexto)
    document.getElementById("nuevasTareas").value = ""
}


function guardarTareas(tarea) {
    let tareas = obtenerTareas()
    tareas.push(tarea)
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function eliminarTareas(tarea) {
    let tareas = obtenerTareas()
    tareas = tareas.filter(t => t !== tarea)
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function obtenerTareas() {
    let tareas = localStorage.getItem("tareas")
    return tareas ? JSON.parse(tareas) : []
}

function cargarTareas() {
    let tareas = obtenerTareas()
    tareas.forEach(tarea => {
        let nuevasTareas = document.createElement("li")
        nuevasTareas.textContent = tarea + " "
        let botonEliminar = document.createElement("button")
        botonEliminar.textContent = "Eliminar"
        botonEliminar.onclick = function () {
            nuevasTareas.remove()
            eliminarTareas(tarea)
        }
        nuevasTareas.appendChild(botonEliminar)
        document.getElementById("lista").appendChild(nuevasTareas)
    })

}

window.onload = function () {
    cargarTareas()
    document.getElementById("nuevasTareas").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            agregarTarea()
        }
    })
}