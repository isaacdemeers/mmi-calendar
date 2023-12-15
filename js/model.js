
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
M.timeFrame = 'week';
M.viewTimeFrame = 0;
M.events = []

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
    let events = [];
    years.forEach(year => {
        events.push(...Events[year].getEventsByFilter(keywords));
    });
    return events;
}

// FILTER GIVEN EVENTS
M.filterEvents = function (events, keywords) {
    if (keywords != '' && keywords != undefined && keywords != null && keywords.length > 0) {
        let newEvents = [];
        events.forEach(event => {
            let data = event.title + ' ' + event.location + ' ' + event.body + ' ' + event.attendees.join(' ');
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


// RETURN THE DATE OF THE FIRST DAY OF THE TIME FRAME AND THE LAST DAY OF THE TIME FRAME (day, week, month)
M.getTimeFrame = function (timeFrame, viewTimeFrame) {
    let today = new Date();
    let currentDay = today.getDay();
    let startDate = new Date(today);
    let endDate = new Date(today);

    switch (timeFrame) {
        case 'day':
            startDate.setDate(today.getDate() + viewTimeFrame);
            endDate.setDate(today.getDate() + viewTimeFrame);
            break;
        case 'week':

            startDate.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1) + (viewTimeFrame * 7));

            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            break;
        case 'month':
            startDate.setMonth(today.getMonth() + viewTimeFrame);
            startDate.setDate(1);
            endDate.setMonth(startDate.getMonth() + 1);
            endDate.setDate(0);
            break;
    }
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return {
        start: startDate,
        end: endDate
    };
}

// COUNT THE TOTAL HOURS OF THE EVENTS GIVEN
M.countHours = function (events) {
    let hours = {
        TOTAL: 0,
        TP: 0,
        TD: 0,
        CM: 0,
    }
    let interval = M.getTimeFrame(M.timeFrame, M.viewTimeFrame);
    // console.log(interval.start);
    // console.log(interval.end);


    let newEvents = events.filter(event => {
        return event.start >= interval.start && event.end <= interval.end;
    });

    newEvents.forEach(event => {
        let duration = (event.end - event.start) / 1000 / 60 / 60;
        hours.TOTAL += duration;

        for (let type in hours) {
            if (event.title.includes(type)) {
                hours[type] += duration;
                break;
            }

        }
    });

    return hours
};


export { M };