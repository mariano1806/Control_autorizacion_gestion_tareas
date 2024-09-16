import { fetchTodos, fetchCreateTodo, fetchUpdateTodo, fetchDeleteTodo } from "./api";

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen",
    "bg-gray-100" // Adjusted from gray-200
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-indigo-600", // Changed from blue-500
    "text-white",
    "px-4",
    "py-2",
    "rounded-lg", // Changed from rounded
    "hover:bg-indigo-700", // Changed from blue-600
    "mb-6" // Adjusted margin
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-4xl", "font-extrabold", "mb-6"); // Changed font size and weight
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add(
    "w-3/4", // Changed from 1/2 width
    "bg-white",
    "shadow-lg", // Changed from shadow-md
    "max-h-[80vh]", // Changed from fixed height
    "overflow-auto" // Changed from overflow-y-scroll
  );

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  ["ID", "Title", "Completed", "Owner Id", "Actions"].forEach((text) => {
    const th = document.createElement("th");
    th.classList.add("border", "px-6", "py-3", "bg-gray-200"); // Changed padding and background
    th.textContent = text;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(table);

  fetchTodos()
    .then((data) => {
      data.todos.forEach((todo) => {
        createTodoRow(todo, tbody);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las tareas:", error);
    });

  const btnNewTodo = document.createElement("button");
  btnNewTodo.classList.add(
    "bg-green-600", // Changed from green-500
    "text-white",
    "px-4",
    "py-2",
    "rounded-lg", // Changed from rounded
    "mt-6" // Adjusted margin
  );
  btnNewTodo.textContent = "Nueva Tarea";
  btnNewTodo.addEventListener("click", () => {
    showCreateTodoForm(tbody);
  });

  container.appendChild(btnNewTodo);
  return container;
};

function createTodoRow(todo, tbody) {
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.classList.add("border", "px-6", "py-3"); // Adjusted padding
  td1.textContent = todo.id;

  const td2 = document.createElement("td");
  td2.classList.add("border", "px-6", "py-3"); // Adjusted padding
  td2.textContent = todo.title;

  const td3 = document.createElement("td");
  td3.classList.add("border", "px-6", "py-3"); // Adjusted padding
  td3.textContent = todo.completed ? "Sí" : "No";

  const td4 = document.createElement("td");
  td4.classList.add("border", "px-6", "py-3"); // Adjusted padding
  td4.textContent = todo.owner;

  const td5 = document.createElement("td");
  td5.classList.add("border", "px-6", "py-3"); // Adjusted padding

  const btnEdit = document.createElement("button");
  btnEdit.classList.add(
    "bg-yellow-500",
    "text-white",
    "px-3",
    "py-1",
    "rounded-md", // Changed from rounded
    "hover:bg-yellow-600",
    "mr-3" // Adjusted margin
  );
  btnEdit.textContent = "Editar";
  btnEdit.addEventListener("click", () => handleEditTodo(todo, tr));

  const btnDelete = document.createElement("button");
  btnDelete.classList.add(
    "bg-red-600", // Changed from red-500
    "text-white",
    "px-3",
    "py-1",
    "rounded-md", // Changed from rounded
    "hover:bg-red-700" // Changed from red-600
  );
  btnDelete.textContent = "Eliminar";
  btnDelete.addEventListener("click", () => handleDeleteTodo(todo, tr));

  td5.appendChild(btnEdit);
  td5.appendChild(btnDelete);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  tbody.appendChild(tr);
}

function showCreateTodoForm(tbody) {
  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "fixed",
    "inset-0", // Changed from top-0 and left-0
    "bg-gray-800", // Changed from gray-900
    "bg-opacity-60", // Changed from bg-opacity-50
    "flex",
    "items-center",
    "justify-center"
  );

  const form = document.createElement("form");
  form.classList.add(
    "bg-white",
    "p-8", // Changed from p-6
    "rounded-lg", // Changed from rounded
    "shadow-xl", // Changed from shadow-lg
    "flex",
    "flex-col",
    "gap-5" // Changed from space-y-4
  );

  const titleInput = document.createElement("input");
  titleInput.classList.add("border", "px-4", "py-2", "rounded-lg", "shadow-sm"); // Changed padding and added shadow
  titleInput.placeholder = "Título";

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";

  const labelCompleted = document.createElement("label");
  labelCompleted.textContent = "Completado:";
  labelCompleted.classList.add("flex", "items-center", "space-x-2"); // Added spacing

  labelCompleted.appendChild(completedCheckbox);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add(
    "bg-indigo-600", // Changed from blue-500
    "text-white",
    "px-4",
    "py-2",
    "rounded-lg", // Changed from rounded
    "hover:bg-indigo-700" // Changed from blue-600
  );
  submitBtn.textContent = "Crear tarea";

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newTodo = {
      title: titleInput.value,
      completed: completedCheckbox.checked,
    };

    fetchCreateTodo(newTodo)
      .then((data) => {
        createTodoRow(data.todo, tbody);
        document.body.removeChild(formContainer); // Cerrar el formulario
      })
      .catch((error) => {
        console.error("Error al crear la tarea:", error);
        alert("Hubo un error al crear la tarea");
      });
  });

  form.appendChild(titleInput);
  form.appendChild(labelCompleted);
  form.appendChild(submitBtn);
  formContainer.appendChild(form);

  document.body.appendChild(formContainer);
}

function handleEditTodo(todo, tr) {
  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "fixed",
    "inset-0", // Changed from top-0 and left-0
    "bg-gray-800", // Changed from gray-900
    "bg-opacity-60", // Changed from bg-opacity-50
    "flex",
    "items-center",
    "justify-center"
  );

  const form = document.createElement("form");
  form.classList.add(
    "bg-white",
    "p-8", // Changed from p-6
    "rounded-lg", // Changed from rounded
    "shadow-xl", // Changed from shadow-lg
    "flex",
    "flex-col",
    "gap-5" // Changed from space-y-4
  );

  const titleInput = document.createElement("input");
  titleInput.classList.add("border", "px-4", "py-2", "rounded-lg", "shadow-sm"); // Changed padding and added shadow
  titleInput.value = todo.title;

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.checked = todo.completed;

  const labelCompleted = document.createElement("label");
  labelCompleted.textContent = "Completado:";
  labelCompleted.classList.add("flex", "items-center", "space-x-2"); // Added spacing

  labelCompleted.appendChild(completedCheckbox);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add(
    "bg-indigo-600", // Changed from blue-500
    "text-white",
    "px-4",
    "py-2",
    "rounded-lg", // Changed from rounded
    "hover:bg-indigo-700" // Changed from blue-600
  );
  submitBtn.textContent = "Actualizar tarea";

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const updatedTodo = {
      title: titleInput.value,
      completed: completedCheckbox.checked,
    };

    fetchUpdateTodo(todo.id, updatedTodo)
      .then((data) => {
        alert("Tarea actualizada con éxito");

        // Actualizar la fila en la tabla
        const tdTitle = tr.querySelector("td:nth-child(2)");
        const tdCompleted = tr.querySelector("td:nth-child(3)");

        tdTitle.textContent = data.todo.title;
        tdCompleted.textContent = data.todo.completed ? "Sí" : "No";

        // Cerrar el formulario
        document.body.removeChild(formContainer);
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea:", error);
        alert("Hubo un error al actualizar la tarea");
      });
  });

  form.appendChild(titleInput);
  form.appendChild(labelCompleted);
  form.appendChild(submitBtn);
  formContainer.appendChild(form);

  document.body.appendChild(formContainer);
}

function handleDeleteTodo(todo, tr) {
  const confirmDelete = confirm(`¿Seguro que quieres eliminar la tarea ${todo.title}?`);
  if (confirmDelete) {
    fetchDeleteTodo(todo.id)
      .then(() => {
        alert("Tarea eliminada con éxito");
        // Eliminar la fila de la tabla
        tr.remove();
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
        alert("Hubo un error al eliminar la tarea");
      });
  }
}