import { M } from "./js/model.js";
import { V } from "./js/view.js";

// INIT
await M.init();

let cookies = M.getCookies();
cookies.years = cookies.year || ['mmi1', 'mmi2', 'mmi3'];
cookies.group = cookies.group || 'all';

M.years = ['mmi1', 'mmi2', 'mmi3']

//SETUP
V.testSupport();
V.uicalendar.createEvents(M.getAllEvents());
V.renderGroups(M.years, M.groups);


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
  }

  if (e.target.classList.contains('checkbox')) {
    if (e.target.checked) {
      M.years.push(e.target.id);
    }
    else {
      M.years.splice(M.years.indexOf(e.target.id), 1);
    }
    M.setCookies(M.years, M.group);
    V.renderGroups(M.years, M.groups);
    V.renderCalendarByYear(M.getEventsByYears(M.years));

  }

});


// EVENTS LISTENERS CHANGE
document.querySelector('body').addEventListener('change', function (e) {

  // CHANGEMENT DU GROUPE
  if (e.target.id.includes('group')) {
    M.group = e.target.value;
    V.uicalendar.clear();
    V.uicalendar.createEvents(M.getEventsByGroup(M.years, M.group));
    V.clearSearchBar();
    M.setCookies(M.years, M.group);
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
