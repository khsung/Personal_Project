const clock=document.querySelector(".curr_clock").querySelector("h1")

function curr_time(){
    const date=new Date()
    const hours=date.getHours()
    const minutes=date.getMinutes()
    const seconds=date.getSeconds()
    clock.innerText=`${hours<10 ? `0${hours}`:`${hours}`}:${minutes<10 ? `0${minutes}` : `${minutes}`}:${seconds<10 ? `0${seconds}`:`${seconds}`}`
}

function timer(){
    curr_time()
    setInterval(curr_time,1000)
}
timer()