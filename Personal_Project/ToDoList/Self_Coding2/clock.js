const clock_div=document.querySelector(".clock")
const clock_h1=clock_div.querySelector("h1")

function timer_start(){
    const cur_clock=new Date()
    const hours=cur_clock.getHours()
    const Minutes=cur_clock.getMinutes()
    const Seconds=cur_clock.getSeconds()
    clock_h1.innerHTML=`${hours<10 ? `0${hours}`:`${hours}`}:${Minutes<10 ? `0${Minutes}`:`${Minutes}`}:${Seconds<10 ? `0${Seconds}`:`${Seconds}`}`
}

function init(){
    setInterval(timer_start,1000);
}

init()