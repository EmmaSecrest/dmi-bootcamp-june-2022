

type Todo = {
  id: string;
  value: string;
};





async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3000/todos");
  return response.json();
}

async function createTodo(): Promise<Todo> {
  const todoInputHtmlElement = document.getElementById("todo-input");
  const todoInput = (todoInputHtmlElement as HTMLInputElement).value;
  const todoInputValue = {value: todoInput }
  
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todoInputValue),
  });
    return response.json();
}

const addButton = document.getElementById("add");
if(addButton === null){
  throw new Error("Something went Wrong")
}
addButton.onclick =  () =>{
  createTodo()
  window.location.reload()
  }

(async () => {
    const list = document.getElementById("todo-list");
    if (!list) throw new Error("Element not found");
    const todos = await getAllTodos();
    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `${todo.value} <button class='btn btn-danger float-end'>Delete</button>`;
      list.appendChild(listItem);
    });
  })();
  
