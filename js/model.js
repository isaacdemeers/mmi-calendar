
import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

// GLOBAL VARIABLES FOR COOKIES
M.years = [];
M.groups = [];

// GROUPS BY YEAR
M.classes = {
    mmi1: ['BUT1-G1', 'BUT1-G21', 'BUT1-G22', 'BUT1-G3', 'BUT1-G41', 'BUT1-G42'],
    mmi2: ['BUT2-G1', 'BUT2-G21', 'BUT2-G22', 'BUT2-G3'],
    mmi3: ['BUT3-G1', 'BUT3-G21', 'BUT3-G22', 'BUT3-G3']
}

// INIT
M.init = async function () {
    for (let annee in Events) {
        let data = await fetch('./data/' + annee + '.ics');
        data = await data.text();
        data = ical.parseICS(data);
        Events[annee] = new EventManager(annee, annee, 'Agenda des ' + annee);
        Events[annee].addEvents(data);
    }
}


// GET COOKIES
M.getCookies = function () {

    // ajoute une correction d'erreur
    if (document.cookie == '') {
        return [];
    }
    let cookies = document.cookie.split(';');
    let data = {};
    cookies.forEach(cookie => {
        let key = cookie.split('=')[0].trim();
        let value = cookie.split('=')[1].trim();
        data[key] = value;
    });
    return data;
}

// SET COOKIES
M.setCookies = function (years, groups) {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date = date.toUTCString();
    if (years.length != 0) {
        document.cookie = 'years=' + years.join(',') + ';expires=' + date;

    }
    if (groups.length != 0) {
        document.cookie = 'groups=' + groups.join(',') + ';expires=' + date;
    }

}

M.delAllCookies = function () {
    let cookies = M.getCookies();
    for (let cookie in cookies) {
        document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

// GET ALL EVENTS
M.getAllEvents = function () {
    let events = [];
    for (let annee in Events) {
        events.push(...Events[annee].getAllEvents());
    }
    return events;
}

M.getEventsByYears = function (years) {
    let events = [];
    years.forEach(year => {
        events.push(...Events[year].getAllEvents());
    });
    console.log(years);
    return events;
}

// GET EVENTS BY GROUP
M.getEventsByGroup = function (years, groups) {
    let events = [];
    years.forEach(year => {
        events.push(...Events[year].getEventsByGroup(groups));
    });
    return events;
}


// GET EVENTS BY FILTER
M.getEventsByFilter = function (years, keywords) {

    console.log(years);
    let events = [];
    years.forEach(year => {
        events.push(...Events[year].getEventsByFilter(keywords));
    });
    return events;
}

export { M };