class Tarea {
    constructor(descripcion, date, hour) {
        this.descripcion = descripcion;
        this.date = date;
        this.hour = hour;
        this.realizada = false;
    }
}

let Tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const guardarTareas = () => {
        localStorage.setItem("tareas", JSON.stringify(Tareas));
}

const mostrarTareas = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    Tareas.sort((a, b) => new Date(a.date) - new Date(b.date));
    Tareas.forEach((tarea, index) => {
        const { descripcion, date, hour, realizada } = tarea;
        const tareaItem = document.createElement("li");
        const taskHtml = `<span>${descripcion} - ${date} - ${hour}</span>
            ${!realizada ? `<button onclick="marcarRealizada(${index})" class="button-realizar">Marcar como realizada</button>` : `<button disabled class="button-realizada">Realizada</button>`
            }
            <button onclick="eliminarTarea(${index})" class="button-eliminar">Eliminar</button>`;
        tareaItem.innerHTML = taskHtml;
        taskList.appendChild(tareaItem);
    });
}

const agregarTarea = () => {
    const descripcion = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const hour = document.getElementById("taskTime").value;
    if (!descripcion || !date || !hour) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    const nuevaTarea = new Tarea(descripcion, date, hour);
    Tareas = [...Tareas, nuevaTarea];
    guardarTareas();
    mostrarTareas();
    document.getElementById("taskForm").reset();
    document.getElementById("taskForm").style.display = "none";
}
const marcarRealizada = (index) => {
    Tareas[index].realizada = true;
    guardarTareas();
    mostrarTareas();
}

const eliminarTarea = (index) => {
    Tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
}

document.getElementById("addTaskButton").addEventListener("click", () => {
        document.getElementById("taskForm").style.display = "block";
});

document.getElementById("saveTaskButton").addEventListener("click", agregarTarea);

mostrarTareas();