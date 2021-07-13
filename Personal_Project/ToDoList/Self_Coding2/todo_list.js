const main_content=document.querySelector(".content")
const input_form= main_content.querySelector(".input_data")
const input_text= input_form.querySelector(".input_text")
const todo_list= main_content.querySelector(".todo_list")
const complete_list= main_content.querySelector(".complete_list")

let todo=[]
let complete_array=[]
let id=1

function complete(event){
    console.log(event.target.id)
    
}

function delete_btn(event){
    const del_todo_id=event.target.id
    for (let i=0;i<todo.length;i++){
        if(todo[i][1]===del_todo_id){
            todo.splice(i,1)
        }
    }
    const del_li=event.target.parentNode.parentNode
    const p_del_li=del_li.parentNode
    p_del_li.removeChild(del_li)

    
    const temp_arr=JSON.parse(localStorage.getItem("todos"))
    let temp_arr1=[]
    for (let i=0;i<temp_arr.length;i++){
        if(temp_arr[i][1]!=del_todo_id){
            temp_arr1.push(temp_arr[i])
        }
    }
    todo=temp_arr1
    localStorage.setItem("todos",JSON.stringify(temp_arr1))

}

function show_todo(){
    for(var i=0;i<todo.length;i++){
        const li=document.createElement("li")
        const span=document.createElement("span")
        const complete_btn=document.createElement("button")
        const del_btn=document.createElement("button")

        span.innerHTML=todo[i][0]
        complete_btn.id=todo[i][1]
        complete_btn.innerText="완료"
        complete_btn.addEventListener('click',complete)
        del_btn.id=todo[i][1]
        del_btn.innerText="삭제"
        del_btn.addEventListener('click',delete_btn)
        span.appendChild(complete_btn)
        span.appendChild(del_btn)
        li.appendChild(span)
        todo_list.appendChild(li)
    }
}

// local storage 데이터 가져오기
function load_todo(){
    let local_data=localStorage.getItem("todos")
    local_data=JSON.parse(local_data)
    if (local_data!==null){
        todo=local_data
        id=local_data[local_data.length-1][1]+1
    }
    
    show_todo()
}

// input 값
function input_todo(event){
    event.preventDefault()
    todo.push([input_text.value,id])
    
    localStorage.setItem("todos",JSON.stringify(todo))

    const li=document.createElement("li")
    const span=document.createElement("span")
    const complete_btn=document.createElement("button")
    const del_btn=document.createElement("button")

    span.innerHTML=input_text.value
    complete_btn.id=id
    complete_btn.innerText="완료"
    complete_btn.addEventListener('click',complete)
    del_btn.id=id
    del_btn.innerText="삭제"
    del_btn.addEventListener('click',delete_btn)
    span.appendChild(complete_btn)
    span.appendChild(del_btn)
    li.appendChild(span)
    todo_list.appendChild(li)
    
    id+=1
    input_text.value=""
    
}

function start(){
    load_todo()
    input_form.addEventListener('submit',input_todo)
}
start()