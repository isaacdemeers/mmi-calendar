

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
            TP: '#edc792',
            TD: '#de993a',
            CM: '#99631a',
            SAE: '#6d4712',
            UNDEFINED: '#6d4712'
        },
        mmi2: {
            TP: '#92b9ed',
            TD: '#3a81de',
            CM: '#1a5099',
            SAE: '#12396d',
            UNDEFINED: '#12396d'
        },

        mmi3: {
            TP: '#d492ed',
            TD: '#b23ade',
            CM: '#771a99',
            SAE: '#55126d',
            UNDEFINED: '#55126d'
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

        const colorMap = {
            'TP': this.#baseColor[this.#year].TP,
            'TD': this.#baseColor[this.#year].TD,
            'CM': this.#baseColor[this.#year].CM,
            'SAÉ': this.#baseColor[this.#year].SAE,

        };


        for (let keyword in colorMap) {
            if (this.#summary.includes(keyword)) {
                return colorMap[keyword];

            }

        }

        return colorMap['SAÉ']

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