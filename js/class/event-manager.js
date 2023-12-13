import { Event } from './event.js';

class EventManager {
    #id;
    #name;
    #description;
    #events;

    constructor(id, name, description) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#events = [];
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    toObject(array) {
        return array.map(event => {
            let obj = event.toObject();
            obj.calendarId = this.#id;
            return obj;
        });
    }

    addEvents(events) {
        for (let uid in events) {
            let event = events[uid];
            this.#events.push(new Event(uid, event.summary, event.description, event.start, event.end, event.location, this.#id));
        }
    }

    getAllEvents() {
        return this.toObject(this.#events);
    }

    getEventsByGroup(groups) {

        if (groups.includes('all')) {
            return this.toObject(this.#events);
        }
        else {
            let newEvents = [];
            this.#events.forEach(event => {

                groups.forEach(group => {

                    if (event.groups.join(' ').includes(group) && !newEvents.includes(event)) {
                        newEvents.push(event);
                    }
                });
            });
            return this.toObject(newEvents);
        }
    }


    getEventsByFilter(keywords) {
        console.log(keywords);
        if (keywords != '') {
            let newEvents = [];
            keywords = keywords.split(' ');
            this.#events.forEach(event => {
                console.log(event);
                let data = event.summary + event.location + event.description + event.groups.join(' ');
                data = data.toLowerCase();

                if (keywords.every(keyword => data.includes(keyword.toLowerCase()))) {
                    newEvents.push(event);
                }
            });
            return this.toObject(newEvents);
        }
        else {
            return this.toObject(this.#events);
        }
    }


    // retourne tous les événements de l'agenda dans un tableau d'objet dont les propriétés sont compatibles avec Toast UI Calendar
    // (voir https://nhn.github.io/tui.calendar/latest/EventObject). On ajoute juste une propriété calendarId pour que Toast UI Calendar
    // puisse identifier l'agenda auquel appartient l'événement

}

export { EventManager };