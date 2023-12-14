

class Event {
    #id;
    #summary;
    #description;
    #start;
    #end;
    #location;
    #groups;
    #baseColor = {
        mmi1: {
            TP: '#bde9aa',
            TD: '#88d867',
            CM: '#58ba2f',
            SAE: '#489827',
            UNDEFINED: '#489827'
        },
        mmi2: {
            TP: '#aad6e9',
            TD: '#67b5d8',
            CM: '#2f90ba',
            SAE: '#277698',
            UNDEFINED: '#277698'
        },

        mmi3: {
            TP: '#c7aae9',
            TD: '#9967d8',
            CM: '#6e2fba',
            SAE: '#5a2798',
            UNDEFINED: '#5a2798'
        }
    };
    #year;


    constructor(id, summary, description, start, end, location, year) {
        this.#id = id;
        this.#summary = summary.slice(0, summary.lastIndexOf(','));
        this.#description = description;
        this.#start = new Date(start);
        this.#end = new Date(end);
        this.#location = location;

        this.#groups = summary.slice(summary.lastIndexOf(',') + 1);
        this.#groups = this.#groups.split('.');
        this.#groups = this.#groups.map(gr => gr.replace(/\s/g, ""));
        this.#year = year;
    }

    get id() {
        return this.#id;
    }

    get summary() {
        return this.#summary;
    }

    get description() {
        return this.#description;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get location() {
        return this.#location;
    }

    get groups() {
        return this.#groups.map(gr => gr); // retourne une copie du tableau
    }

    get type() {
        for (let year in this.#baseColor) {
            if (year == this.#year) {
                for (let keyword in this.#baseColor[year]) {
                    if (this.#summary.includes(keyword)) {
                        return this.#baseColor[year][keyword];
                    }
                }
                return this.#baseColor[year]['UNDEFINED'];
            }
        }
    }
    // retourne un objet contenant les informations de l'événement
    // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
    toObject() {
        return {
            id: this.#id,
            title: this.#summary,
            body: this.#description,
            start: this.#start,
            end: this.#end,
            location: this.#location,
            backgroundColor: this.type,
            attendees: this.#groups,
            borderColor: "#",
        }
    }
}

export { Event };