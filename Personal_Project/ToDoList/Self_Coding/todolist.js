const main_content=document.querySelector(".todo_list_content")
const input_form=main_content.querySelector(".input_form")
const todo_list=main_content.querySelector(".content_list")
let todo_array=[]

const local_data=localStorage.getItem("todo_array")
const parsed_data=JSON.parse(local_data)
function del_todo(event){
    const btn=event.target
    const li=btn.parentNode
    const temp_array=todo_array.filter(todo=>{
        return todo.id!==Number(li.id)})
    todo_array=temp_array
    set_local_item()
    todo_list.removeChild(li)
    
}

function add_todo(input){
    const li=document.createElement("li")
    const span=document.createElement("span")
    const del_btn=document.createElement("button")
    del_btn.innerText="DEL"
    del_btn.addEventListener("click",del_todo)
    span.innerText=input
    li.appendChild(span)
    li.appendChild(del_btn)
    li.id=todo_array.length+1
    todo_list.appendChild(li)
}

function set_local_item(){
    localStorage.setItem("todo_array",JSON.stringify(todo_array))
}

function input_action(event){
    event.preventDefault()
    const input_data=input_form.querySelector("input")
    add_todo(input_data.value)
    const list_obj={
        text:input_data.value,
        id:todo_array.length+1
    }
    todo_array.push(list_obj)
    set_local_item()
    input_data.value=""
}

function load_todo_list(){
    if(local_data!=null){
        parsed_data.forEach(element => {
            add_todo(element.text)
        });
    }
    todo_array=parsed_data
}

function todo_list_main(){
    input_form.addEventListener('submit',input_action)
    load_todo_list()
}
todo_list_main()