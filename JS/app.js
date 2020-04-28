let countDown;
let index = 0;
let stopf = false;
const favicon = document.getElementById("favicon");
const app = document.querySelector(".app");
const audio = document.querySelector(".woosh");
const timerDisplay = document.querySelector(".timer");
const circleSmall = document.querySelector(".pomodoro__circle--small")
const pomodoroTime = document.querySelector(".pomodoro-time")
const restTime = document.querySelector(".rest-time")
const stopBtn0 = document.querySelector(".btn-0")
const stopBtn1 = document.querySelector(".btn-1")
const stopBtn2 = document.querySelector(".btn-2")
const stopBtn3 = document.querySelector(".btn-3")
const stopBtn4 = document.querySelector(".btn-4")
const group0 = document.querySelector(".g0")
const group1 = document.querySelector(".g1")
const group2 = document.querySelector(".g2")
const group3 = document.querySelector(".g3")
const menu = document.querySelector(".menu")
const settingsBtn_1 = document.querySelector(".menu-display-1")
const settingsBtn_2 = document.querySelector(".menu-display-2")
//pomodoroTime.classList.toggle('active')

//CountDown
const timer = function (pomodoro = 1500000, rest = 300000) {


    const now = Date.now();
    if (index % 2 == 1) {
        var then = now + rest
    } else {
        var then = now + pomodoro
    }



    countDown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        displayTimeLeft(secondLeft);
        if (index % 2 == 1) {
            rotation(secondLeft, rest);
            app.style.backgroundImage = `linear-gradient(
        to right bottom,
        #56AB2F,#A8E063)`;
            favicon.setAttribute("href", "../img/Favi Green.png")
        } else {
            rotation(secondLeft, pomodoro);
            app.style.backgroundImage = `linear-gradient(
        to right bottom,
        #DE6262,#FFB88C)`;
            favicon.setAttribute("href", "../img/Favi Red.png")
        }

        if (stopf) {
            clearInterval(countDown)
        }

        if (secondLeft <= 0) {
            audio.currentTime = 0;
            audio.play()
            clearInterval(countDown);
            index++
            timer(pomodoro, rest)

        }
    }, 1000);

}


//Display CountDown
const displayTimeLeft = function (seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`
    document.title = display
    timerDisplay.textContent = display
}

//rotation
const rotation = function (seconds, totalTime) {

    totalTime = totalTime / 1000
    let deg = (seconds / totalTime) * 360
    console.log(deg)
    console.log(totalTime)
    console.log(seconds)
    circleSmall.style.transform = `translate(-50%, -50%) rotate(${-deg}deg)`;
}

const minToMilSec = function (minutes) {
    let seconds = minutes * 60
    let milisec = seconds * 1000
    return milisec
}


const start = function () {
    stopf = false;
    let pomodoro = pomodoroTime.value
    let rest = restTime.value
    if (index == 0) {
        group0.classList.remove('button-on')
        group0.classList.add('button-off')


    }

    group1.classList.remove('button-off')
    group1.classList.add('button-on')


    if (pomodoro) {
        pomodoro = minToMilSec(pomodoro)
    }
    if (rest) {
        rest = minToMilSec(rest)
    }

    if (pomodoro && rest) {
        timer(pomodoro, rest);
    } else if (pomodoro) {
        timer(pomodoro)
    } else if (rest) {
        console.log("rest: " + rest)
        timer(1500000, rest)
    } else {
        timer()
    }
}

const pause = function () {
    stopf = true
    //let sec = timer()
}

const stopFunc = function () {
    stopf = true
    group1.classList.remove('button-on')
    group1.classList.add('button-off')
    group0.classList.remove('button-off')
    group0.classList.add('button-on')
    app.style.backgroundImage = `linear-gradient(
        to right bottom,
        #000000,#434343)`;
    favicon.setAttribute("href", "../img/Favi Black.png")
}

const resume = function () { }

const skip = function () { }


const displaySettings = function () {
    menu.classList.toggle('off-screen')
    console.log("activado")
}

//Controler
stopBtn0.addEventListener("click", start);
stopBtn1.addEventListener("click", pause);
stopBtn2.addEventListener("click", stopFunc);
stopBtn3.addEventListener("click", resume);
stopBtn4.addEventListener("click", skip);
settingsBtn_1.addEventListener("click", displaySettings);
settingsBtn_2.addEventListener("click", displaySettings);

console.log(favicon)