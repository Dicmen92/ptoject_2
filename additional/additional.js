'use strict';

const optionsWeek = {
    weekday: "long",    
};

function countTime(deadline) {
    const paragraph = document.querySelector('.date');

    function getDate() {
        const date = new Date(), //теккущее время и дата
            dayNow = date.toLocaleString('ru', optionsWeek).slice(0, 1).toUpperCase() + date.toLocaleString('ru', optionsWeek).substr(1).toLowerCase(), //Первая большая,  остальные мал.
            timeNow = date.toLocaleTimeString('en'),
            dayStop = new Date(deadline),
            secondsLeft = (dayStop.getTime() - date.getTime()) / 1000,
            dayLeft = Math.floor(secondsLeft / 60 / 60 / 24),
            hours = date.getHours();
            
        return {
            hours,
            secondsLeft,
            dayNow,
            timeNow,
            dayLeft,
        };
    }
    function checkTimeOfDay(time) {
        if (time > 4 && time < 13) {
            return 'Доброе утро';
        } else if (time >= 13 && time <=17) {
            return 'Добрый день';
        } else if (time > 17 && time <= 22) {
            return 'Добрый вечер';
        } else if (time > 22 || (time >= 0 && time <=4)) {
            return 'Доброй ночи';
        }
    }
    function checkDay(day) {
        if (day % 10 > 1 && day % 10 < 5) {
            return 'дня';
        } else if (day % 10 === 1) {
            return 'день';
        } else {
            return 'дней';
        }
    }
    function updateClock() {
        const timer = getDate();
        console.log(timer.hours)
        paragraph.innerHTML = `${checkTimeOfDay(timer.hours)} <br> Сегодня: ${timer.dayNow} <br>
    Текущее время: ${timer.timeNow}<br>
    До нового года осталось ${timer.dayLeft} ${checkDay(timer.dayLeft)}`;

        if (timer.secondsLeft > 0) {
            setTimeout(updateClock, 1000);
        } else {
            paragraph.textContent = 'Новый год наступил!';
        }
    }
    updateClock();

};
countTime('31 december 2020');