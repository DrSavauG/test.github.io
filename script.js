"use strict";
const x = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];
var i = 0;
function moveMan(id) {
    if (x[id] != 0) return false;
    x[id] = 1;
    document.getElementById(id).className = "cell " + "hero";
    moveAi();
    checkEnd(1, "alert('Дааа-ладно!!!')");
}

function moveAi() {
    var step;
    if (checkDefence(-2) !== undefined) {
        step = checkDefence(-2);
    } else if (checkDefence(2) !== undefined) {
        step = checkDefence(2);
    } else {
        if (checkFirstSteps() !== undefined) {
            step = checkFirstSteps();
        } else step = otherCases();
    }
    x[step] = -1;
    i++;
    if (i > 4) whoWin("alert('Ничья')");
    document.getElementById(step).className = "cell " + "zero";
    checkEnd(-1, "alert('Ты проиграл!!!')");
}

function otherCases() {
    if (x[4] == 0) return 4;
    for (let i = 0; i < 9; i++) {
        if (x[i] == 0) return i;
    }
}
const n = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    0, 3, 6,
    1, 4, 7,
    2, 5, 8,
    0, 4, 8,
    2, 4, 6
];

function checkDefence(a) {
    for (let i = 0; i < n.length; i += 3) {
        if (summing(n[i], n[i + 1], n[i + 2]) == a) return findingTheGap(n[i], n[i + 1], n[i + 2]);
    }
}

function summing(a, b, c) {
    return x[a] + x[b] + x[c];
}

function findingTheGap(a, b, c) {
    if (x[a] == 0) return a;
    if (x[b] == 0) return b;
    if (x[c] == 0) return c;
}

function checkFirstSteps() {
    if (x[0] == 1 && x[8] == 1 && x[1] == 0) return 1;
    if (x[2] == 1 && x[6] == 1 && x[7] == 0) return 7;
    if (x[4] == 1 && x[8] == 1 && x[2] == 0) return 2;
    if (x[5] == 1 && x[7] == 1 && x[2] == 0) return 2;
}


function numbers(a, b, c) {
    if (x[a] + x[b] + x[c] == 3) return 3;
    if (x[a] + x[b] + x[c] == -3) return -3;
    else return false;
}

function checkEnd(num, text) {
    for (let i = 0; i < n.length; i += 3) {
        if (x[n[i]] == num &&
            x[n[i + 1]] == num &&
            x[n[i + 2]] == num) return whoWin(text);
    }
}
var unswer;
// aiWins
function whoWin(text) {
    unswer = setTimeout(text, 300)
    if (unswer) return setTimeout(() => reset(), 400);
}
function reset() {
    window.location.reload()
}