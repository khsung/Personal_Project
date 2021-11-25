const form=document.querySelector('.js_todoform')
const todoinput=form.querySelector('input')
const todolist=document.querySelector('.js_todolist')
let todos=[]

function deletetodo(event){
    const btn=event.target
    const li=btn.parentNode
    todolist.removeChild(li)
    const cleartodos=todos.filter(todo => {
        console.log(todo.id,li.id)
        return todo.id!==Number(li.id)
    })
    console.log(cleartodos)
    todos=cleartodos
    settodos()
}

function settodos(){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function showTodos(value){
    const li=document.createElement('li')
    const delbtn=document.createElement('button')
    const newid=todos.length+1
    const span=document.createElement('span')
    span.innerText=value
    delbtn.innerText='del'
    delbtn.addEventListener('click',deletetodo)
    li.appendChild(span)
    li.appendChild(delbtn)
    li.id=newid
    todolist.appendChild(li)
    const todoobj={
        text:value,
        id:todos.length+1
    }
    todos.push(todoobj)
    console.log(todos)
    settodos()
}

function loadtodos(){
    const loadedtodos=localStorage.getItem('todos')
    if(loadedtodos!=null){
        const parsedtodos=JSON.parse(loadedtodos)
        parsedtodos.forEach(todo =>showTodos(todo.text) );
    }
    
}

function handlesubmit(event){
    event.preventDefault()
    const currvalue=todoinput.value
    showTodos(currvalue)
    todoinput.value=""
}

function init(){
    form.addEventListener('submit',handlesubmit)
    loadtodos()
}

init()