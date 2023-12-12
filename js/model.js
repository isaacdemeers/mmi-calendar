
import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}

let M = {};

// GLOBAL VARIABLES FOR COOKIES
M.year = 'mmi1'
M.group = 'all'
M.search = ''

// GROUPS BY YEAR
M.Groups = {
    mmi1: ['G1', 'G21', 'G22', 'G3', 'G41', 'G42'],
    mmi2: ['G1', 'G21', 'G22', 'G3'],
    mmi3: ['G1', 'G2', 'G3']
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

// CREATE A DATE FOR COOKIES
M.getCookiesExpirationDate = function () {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toUTCString();
}

// GET COOKIES
M.getCookies = function () {
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
M.setCookies = function (year, group) {
    let date = M.getCookiesExpirationDate();
    document.cookie = 'year=' + year; + '; expires=' + date;
    document.cookie = 'group=' + group; + '; expires=' + date;

}

// GET EVENTS BY YEAR
M.getEvents = function (annee) {
    if (annee in Events) {
        return Events[annee].toObject();
    }
    else {
        let events = [];
        for (let annee in Events) {
            events = events.concat(Events[annee].toObject());
        }
        return events;
    }
}

// GET EVENTS BY YEAR AND GROUP
M.getEventsByGroup = function (annee, group) {
    console.log(annee, group);
    if (group != 'all') {
        if (annee in Events) {
            let events = Events[annee].toObject();
            return events.filter(event => event.attendees.includes(group));
        }
    }
    else {
        return M.getEvents(annee);
    }
}


// FILTER EVENTS FOR SEARCH BAR
M.filter = function (events, keywords) {
    M.search = keywords;
    if (keywords != '') {
        let newEvents = [];
        keywords = keywords.split(' ');

        events.forEach(event => {
            let data = event.title + event.location + event.body + event.attendees.join(' ');
            data = data.toLowerCase();

            if (keywords.every(keyword => data.includes(keyword.toLowerCase()))) {
                newEvents.push(event);
            }
        });
        return newEvents;
    }
    else {
        return events;
    }
}

export { M };