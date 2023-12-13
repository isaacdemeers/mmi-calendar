
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
M.search = '';

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

// GET LOCAL STORAGE DATA
M.getLocalData = function () {
    return localStorage;
};

// SET LOCAL STORAGE DATA
M.setLocalData = function (key, data) {
    localStorage.setItem(key, data);
};

// CLEAR LOCAL STORAGE DATA
M.clearLocalData = function (key) {
    localStorage.removeItem(key);
};


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

// FILTER GIVEN EVENTS
M.filterEvents = function (events, keywords) {
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