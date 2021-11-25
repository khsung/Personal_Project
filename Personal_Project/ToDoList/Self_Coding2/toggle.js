const clock_btn=clock_div.querySelector("button")

clock_btn.addEventListener('click',function(){
    main_content.classList.toggle('active')
    if (clock_btn.textContent==="To Do List 닫기"){
        clock_btn.innerHTML="To Do List 열기"
    }else{
        clock_btn.innerHTML="To Do List 닫기"
    }
})
