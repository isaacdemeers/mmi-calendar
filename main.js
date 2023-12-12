import { M } from "./js/model.js";
import { V } from "./js/view.js";

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
   
*/


// loadind data (and wait for it !)
await M.init();

let cookies = M.getCookies();

M.year = cookies.year;
M.group = cookies.group;


// creating events in the calendar
V.uicalendar.createEvents(M.getEventsByGroup(M.year, M.group));
V.renderGroups(M.year, M.Groups, M.group);








document.querySelector('body').addEventListener('click', function (e) {
  if (e.target.id.includes('prev')) {
    V.uicalendar.prev();
  }

  if (e.target.id.includes('next')) {
    V.uicalendar.next();
  }

  if (e.target.id.includes('today')) {
    V.uicalendar.today();
  }
  if (e.target.id.includes('search')) {
    V.clearSearchBar();
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.filter(M.getEventsByGroup(M.year, M.group), e.target.value));
  }

});

document.querySelector('body').addEventListener('change', function (e) {

  if (e.target.id.includes('year')) {
    V.uicalendar.clear();
    V.renderGroups(e.target.value, M.Groups);
    M.year = e.target.value;
    V.uicalendar.createEvents(M.getEvents(e.target.value));
    V.clearSearchBar();
    M.setCookies(M.year, M.group, M.search);

  }

  if (e.target.id.includes('group')) {
    V.uicalendar.clear();
    M.group = e.target.value;
    V.uicalendar.createEvents(M.getEventsByGroup(M.year, M.group));
    V.clearSearchBar();
    M.setCookies(M.year, M.group, M.search);

  }

  if (e.target.id.includes('time')) {
    V.uicalendar.changeView(e.target.value);
  }

});

document.querySelector('body').addEventListener('keyup', function (e) {
  if (e.target.id.includes('search')) {
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.filter(M.getEventsByGroup(M.year, M.group), e.target.value));
  }
});


console.log(M.getCookies());





