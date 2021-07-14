const main_content=document.querySelector(".content")
const input_form= main_content.querySelector(".input_data")
const input_text= input_form.querySelector(".input_text")
const todo_list= main_content.querySelector(".todo_list")
const complete_list= main_content.querySelector(".complete_list")

let todo=[]
let complete_array=[]
let todo_id=1
let complete_id=1

function complete(event){
    const del_complete_id=Number(event.target.id)
    let text_value
    const del_li=event.target.parentNode.parentNode
    const p_del_li=del_li.parentNode
    p_del_li.removeChild(del_li)
    
    const temp_arr=JSON.parse(localStorage.getItem("todos"))
    let temp_arr1=[]
    for (let i=0;i<temp_arr.length;i++){
        if(temp_arr[i][1]!==del_complete_id){
            temp_arr1.push(temp_arr[i])
        }else{
            text_value=temp_arr[i][0]
        }
    }
    todo=temp_arr1
    if(todo.length===0){
        localStorage.removeItem("todos")
    }else{
        localStorage.setItem("todos",JSON.stringify(temp_arr1))
    }

    complete_array.push([text_value,complete_id])
    console.log(complete_array)
    if(complete_array.length===0){
        localStorage.removeItem("completes")
    }else{
        localStorage.setItem("completes",JSON.stringify(complete_array))
    }
    const li=document.createElement("li")
    const span=document.createElement("span")
    const del_btn=document.createElement("button")

    span.innerHTML=text_value
    del_btn.id=complete_id
    del_btn.innerText="삭제"
    del_btn.addEventListener('click',delete_btn_complete)
    span.appendChild(del_btn)
    li.appendChild(span)
    complete_list.appendChild(li)
    complete_id+=1
}

function delete_btn_complete(event){
    const del_complete_id=Number(event.target.id)
    console.log(del_complete_id)
    for (let i=0;i<complete_array.length;i++){
        if(complete_array[i][1]===del_complete_id){
            complete_array.splice(i,1)
        }
    }
    const del_li=event.target.parentNode.parentNode
    const p_del_li=del_li.parentNode
    p_del_li.removeChild(del_li)

    
    const temp_arr=JSON.parse(localStorage.getItem("completes"))
    let temp_arr1=[]
    for (let i=0;i<temp_arr.length;i++){
        if(Number(temp_arr[i][1])!==del_complete_id){
            temp_arr1.push(temp_arr[i])
        }
    }
    complete_array=temp_arr1
    console.log(complete_array)
    if(complete_array.length===0){
        localStorage.removeItem("completes")
    }else{
        localStorage.setItem("completes",JSON.stringify(complete_array))
    }
}

function delete_btn_todo(event){
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
    if(todo.length===0){
        localStorage.removeItem("todos")
    }else{
        localStorage.setItem("todos",JSON.stringify(temp_arr1))
    }
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
        del_btn.addEventListener('click',delete_btn_todo)
        span.appendChild(complete_btn)
        span.appendChild(del_btn)
        li.appendChild(span)
        todo_list.appendChild(li)
    }

    for(var i=0;i<complete_array.length;i++){
        const li=document.createElement("li")
        const span=document.createElement("span")
        const del_btn=document.createElement("button")

        span.innerHTML=complete_array[i][0]
        del_btn.id=complete_array[i][1]
        del_btn.innerText="삭제"
        del_btn.addEventListener('click',delete_btn_complete)
        span.appendChild(del_btn)
        li.appendChild(span)
        complete_list.appendChild(li)
    }
}

// local storage 데이터 가져오기
function load_todo(){
    let local_data_todo=JSON.parse(localStorage.getItem("todos"))
    if (local_data_todo!==null){
        todo=local_data_todo
        todo_id=local_data_todo[local_data_todo.length-1][1]+1
    }
    let local_data_complete=JSON.parse(localStorage.getItem("completes"))
    if (local_data_complete!==null){
        complete_array=local_data_complete
        complete_id=local_data_complete[local_data_complete.length-1][1]+1
    }
    show_todo()
}

// input 값
function input_todo(event){
    event.preventDefault()
    if(input_text.value===""){
        alert("공백입니다")
    }else{
        todo.push([input_text.value,todo_id])
        
        if(todo.length===0){
            localStorage.removeItem("todos")
        }else{
            localStorage.setItem("todos",JSON.stringify(todo))
        }

        const li=document.createElement("li")
        const span=document.createElement("span")
        const complete_btn=document.createElement("button")
        const del_btn=document.createElement("button")

        span.innerHTML=input_text.value
        complete_btn.id=todo_id
        complete_btn.innerText="완료"
        complete_btn.addEventListener('click',complete)
        del_btn.id=todo_id
        del_btn.innerText="삭제"
        del_btn.addEventListener('click',delete_btn_todo)
        span.appendChild(complete_btn)
        span.appendChild(del_btn)
        li.appendChild(span)
        todo_list.appendChild(li)
        
        todo_id+=1
        input_text.value=""
    }
}

function start(){
    load_todo()
    input_form.addEventListener('submit',input_todo)
}
start()