
import ical from 'ical';
import { EventManager } from './class/event-manager';

let Events = {
    mmi1: null,
    mmi2: null,
    mmi3: null
}



let M = {};

M.year = 'mmi1'

M.Groups = {
    mmi1: ['G1', 'G21', 'G22', 'G3', 'G4'],
    mmi2: ['G1', 'G21', 'G22', 'G3'],
    mmi3: ['G1', 'G2', 'G3']
}

M.getEvents = function (annee) {
    if (annee in Events) {

        return Events[annee].toObject();
    }
    else if (annee == 'all') {
        let events = [];
        for (let annee in Events) {
            events = events.concat(Events[annee].toObject());
        }
        return events;
    }
    return null;
}

M.getEventsByGroup = function (annee, group) {
    if (annee in Events) {
        let events = Events[annee].toObject();
        console.log(events);
        return events.filter(event => event.attendees.includes(group));
    }
    return null;
}


M.filter = function (events, keywords) {

    if (keywords != '') {
        keywords = keywords.toLowerCase();
        return events.filter(event => {
            for (let keyword of keywords) {
                const fieldsToCheck = ['title', 'body', 'location'];

                if (fieldsToCheck.some(field => event[field] && event[field].toLowerCase.includes(keyword))) {
                    return true;
                }
            }
            return false;

        }
        );
    }
    else {
        return events;
    }

}

M.init = async function () {
    for (let annee in Events) {

        let data = await fetch('./data/' + annee + '.ics');
        data = await data.text();
        data = ical.parseICS(data);
        Events[annee] = new EventManager(annee, annee, 'Agenda des ' + annee);
        Events[annee].addEvents(data);
    }

}

export { M };


/*
    On notera que si tout ce qui est dans ce fichier concerne le modèle, seul ce qui est dans M est exporté (et donc accessible depuis l'extérieur).
    C'est une façon de faire qui permet de garder privé les données "réelles" qui sont dans Events mais dont la visibilité est limitée à ce module/fichier.
    Donc il faut voir M comme la partie publique de la vue et le reste comme la partie privée.
    C'est sensiblement différent de ce qu'on faisait jusqu'à présent où tout était dans l'objet M.
    L'utilisation des modules javascript nous permet ici de choisir ce que l'on veut rendre public ou privé.
    C'est une autre façon d'implémenter le concept d'encapsulation sans avoir à utiliser les classes.
    A noter qu'on aurait pu faire une classe "Model" mais dans la mesure où l'on n'aurait qu'une seule instance de Model, ce n'est pas vraiment utile.
    
*/