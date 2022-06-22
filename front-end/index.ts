

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

async function deleteTodo(nodeID:string):Promise<Todo>{
  const response = await fetch(`http://localhost:3000/todo/${nodeID}`,{
    method: "DELETE",
    headers:{
      "Content-Type": "application/json"
    }})
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
      // const buttonId = Date.now();
      // const buttonIdString = buttonId.toString();
      listItem.id = todo.id
     
      const deleteButton = document.createElement('button')
      deleteButton.classList.value ='btn btn-danger float-end'
      // deleteButton.id = buttonIdString
      deleteButton.textContent = 'Delete'
      
      deleteButton.onclick  = () => {
        // console.log(buttonIdString)
        deleteTodo(todo.id);
        window.location.reload()
      }
      
      listItem.innerHTML = `${todo.value}`;
      listItem.appendChild(deleteButton)
      // console.log(buttonId)
      list.appendChild(listItem);
    });
  })();

  // console.log(buttonIdString)
//  const deleteButton = document.getElementById(buttonIdString) 
// //  console.log( "delete button:  "+ deleteButton)
//  if(!deleteButton){
//   // console.log(buttonIdString)
//   throw new Error('Delete button is null')
//  }

//  deleteButton.onclick  = () => {
//   deleteTodo(buttonIdString);
//   window.location.reload()
// }



  
