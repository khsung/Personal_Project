const clockContainer = document.querySelector('.js_clock');
const clockTitle=clockContainer.querySelector('h1');
console.log('clockContainer:',clockContainer);
console.log('clockTitle:',clockTitle);

function getTime(){
    const date= new Date();
    const hours = date.getHours()
    const minutes=date.getMinutes()
    const seconds=date.getSeconds()
    clockTitle.innerHTML=`${hours<10 ? `0${hours}`:`${hours}`}:${ minutes<10 ? `0${ minutes}`:`${ minutes}`}:${seconds<10 ? `0${seconds}`:`${seconds}`}`
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init()