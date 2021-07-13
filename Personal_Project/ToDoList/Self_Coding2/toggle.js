const clock_btn=clock_div.querySelector("button")

clock_btn.addEventListener('click',function(){
    main_content.classList.toggle('active')
    if (clock_btn.textContent==="닫기"){
        clock_btn.innerHTML="열기"
    }else{
        clock_btn.innerHTML="닫기"
    }
})
