import { M } from "./js/model.js";
import { V } from "./js/view.js";

// INIT
await M.init();
let cookies = M.getCookies();
M.year = cookies.year;
M.group = cookies.group;


//SETUP
V.testSupport();

V.uicalendar.createEvents(M.getEventsByGroup(M.year, M.group));
V.selectGroups(M.year, M.Groups, M.group);
V.renderYear(M.year, M.Groups);


// EVENTS LISTENERS CLICKS
document.querySelector('body').addEventListener('click', function (e) {

  // VUE PRECEDENTE
  if (e.target.id.includes('prev')) {
    V.uicalendar.prev();
  }

  // VUE SUIVANTE
  if (e.target.id.includes('next')) {
    V.uicalendar.next();
  }

  // VUE AUJOURD'HUI
  if (e.target.id.includes('today')) {
    V.uicalendar.today();
  }

  // CLEAR DE LA RECHERCHE
  if (e.target.id.includes('search')) {
    V.clearSearchBar();
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.filter(M.getEventsByGroup(M.year, M.group), e.target.value));
  }

});


// EVENTS LISTENERS CHANGE
document.querySelector('body').addEventListener('change', function (e) {

  // CHANGEMENT DE L'ANNEE
  if (e.target.id.includes('year')) {
    V.uicalendar.clear();
    V.renderGroups(e.target.value, M.Groups);
    M.year = e.target.value;
    V.uicalendar.createEvents(M.getEvents(e.target.value));
    V.clearSearchBar();
    M.setCookies(M.year, M.group, M.search);
    V.renderGroups(M.year, M.Groups);
    console.log(e.target.value);
  }

  // CHANGEMENT DU GROUPE
  if (e.target.id.includes('group')) {
    V.uicalendar.clear();
    M.group = e.target.value;
    V.uicalendar.createEvents(M.getEventsByGroup(M.year, M.group));
    V.clearSearchBar();
    M.setCookies(M.year, M.group, M.search);
  }

  // CHANGEMENT DE LA VUE
  if (e.target.id.includes('time')) {
    V.uicalendar.changeView(e.target.value);
  }

});


// EVENTS LISTENERS KEYUP
document.querySelector('body').addEventListener('keyup', function (e) {

  // RENDER DE LA RECHERCHE
  if (e.target.id.includes('search')) {
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.filter(M.getEventsByGroup(M.year, M.group), e.target.value));
  }
});
