/*判断某年是否是闰年*/
function isLeap(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    } else {
        return false;
    }
}

let monthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/*判断某年某月某日是星期几，默认日为1号*/
function whatDay(year, month, day = 1) {
    let sum = 0;
    sum += (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + day;
    for (let i = 0; i < month - 1; i++) {
        sum += monthDay[i];
    }
    if (month > 2) {
        if (isLeap(year)) {
            sum += 29;
        } else {
            sum += 28;
        }
    }
    return sum % 7;      //余数为0代表那天是周日，为1代表是周一，以此类推
}

/*显示日历*/
function showCld(year, month, firstDay) {
    let i;
    let tagClass = "";
    let nowDate = new Date();

    let days;
    if (month == 2) {
        if (isLeap(year)) {
            days = 29;
        } else {
            days = 28;
        }
    } else {
        days = monthDay[month - 1];
    }

    /*当前显示月份添加至顶部*/
    let topdateHtml = year + "年" + month + "月";
    let topDate = document.getElementById('topDate');
    topDate.innerHTML = topdateHtml;

    /*添加日期*/
    let tbodyHtml = '<tr>';
    for (i = 0; i < firstDay; i++) {
        tbodyHtml += "<td></td>";
    }
    let changLine = firstDay;
    for (i = 1; i <= days; i++) {
        if (year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i == nowDate.getDate()) {
            tagClass = "curDate";
        } else {
            tagClass = "isDate";
        }
        tbodyHtml += "<td class=" + tagClass + ">" + i + "</td>";
        changLine = (changLine + 1) % 7;
        if (changLine == 0 && i != days) {
            tbodyHtml += "</tr><tr>";
        }
    }
    if (changLine != 0) {
        for (i = changLine; i < 7; i++) {
            tbodyHtml += "<td></td>";
        }
    }
    tbodyHtml += "</tr>";
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = tbodyHtml;
}

let index = 0;

function nextBgi() {
    let elem = document.getElementById("main");
    if (!elem)
        return;

    let list_li = elem.children;
    for (let i = 0; i < list_li.length; i++) {
        list_li[i].style.opacity = "0";
        list_li[i].style.zIndex = "0";
    }
    index++;
    if (index >= list_li.length)
        index = 0;
    list_li[index].style.opacity = "100%";
    list_li[index].style.zIndex = "1";
}

function lastBgi() {
    let elem = document.getElementById("main");
    if (!elem)
        return;
    let list_li = elem.children;
    for (let i = 0; i < list_li.length; i++) {
        list_li[i].style.opacity = "0";
        list_li[i].style.zIndex = "0";
    }
    index--;
    if (index < 0)
        index = list_li.length - 1;
    list_li[index].style.opacity = "100%";
    list_li[index].style.zIndex = "1";
}

let indexOfMusic = 0
let musicArr = ["http://music.163.com/song/media/outer/url?id=434871406.mp3",
    "http://music.163.com/song/media/outer/url?id=483454599.mp3",
    "http://music.163.com/song/media/outer/url?id=494655.mp3",
    "http://music.163.com/song/media/outer/url?id=428391474.mp3",
    "http://music.163.com/song/media/outer/url?id=1380369199.mp3"];
let myAudio;

function nextMusic() {
    indexOfMusic++;
    if (indexOfMusic >= musicArr.length)
        indexOfMusic = 0;
    myAudio.src = musicArr[indexOfMusic];
    myAudio.play();
    document.getElementById("playing").title = "暂停";
    document.getElementById("playing").innerText = "";
}

function lastMusic() {
    indexOfMusic--;
    if (indexOfMusic < 0)
        indexOfMusic = musicArr.length - 1;
    myAudio.src = musicArr[indexOfMusic];
    myAudio.play();
    document.getElementById("playing").title = "暂停";
    document.getElementById("playing").innerText = "";
}

function pauseMusic() {
    if (myAudio.paused){
        myAudio.play();
        document.getElementById("playing").title = "暂停";
        document.getElementById("playing").innerText = "";
    }
    else{
        myAudio.pause();
        document.getElementById("playing").title = "播放";
        document.getElementById("playing").innerText = "";
    }
}

window.onload = function () {
    let curDate = new Date();
    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth() + 1;
    showCld(curYear, curMonth, whatDay(curYear, curMonth));

    let timer = setInterval(nextBgi, 5200);

    let elem_main = document.getElementById("main");
    if (elem_main) {
        elem_main.onmouseenter = function () {
            clearInterval(timer);
        }
        elem_main.onmouseleave = function () {
            timer = setInterval(nextBgi, 5200);
        }
    }

    let elem_audio = document.getElementById("myAudio");
    if (elem_audio) {
        myAudio = new Audio();
        myAudio.preload = "true";
        myAudio.src = musicArr[indexOfMusic];
        myAudio.volume = 0.3;
        myAudio.loop = false;
        myAudio.addEventListener('ended', nextMusic, false);
        elem_audio.appendChild(myAudio);
    }
}
