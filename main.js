import { M } from "./js/model.js";
import { V } from "./js/view.js";

// INIT
await M.init();


let cookies = M.getCookies();

if (cookies.years == undefined) {
  M.setCookies(['mmi1', 'mmi2', 'mmi3'], []);
  cookies = M.getCookies();
}
if (cookies.groups == undefined) {
  M.setCookies([], ['all']);
  cookies = M.getCookies();
}
M.years = cookies.years.split(',');
M.groups = cookies.groups.split(',');
console.log(cookies);



//SETUP
V.testSupport();
V.uicalendar.createEvents(M.getEventsByGroup(M.years, M.groups));
V.renderGroups(M.years, M.classes, M.groups);
V.setCookiesPreferences(M.years);


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
  }

  if (e.target.classList.contains('checkbox')) {
    if (e.target.checked) {
      M.years.push(e.target.id);
      if (!M.groups.includes('all')) {
        M.classes[e.target.id].forEach(group => {
          M.groups.push(group);
        });
      }
    }
    else {
      M.years.splice(M.years.indexOf(e.target.id), 1);
      M.groups.forEach(group => {
        if (M.classes[e.target.id].join(' ').includes(group)) {
          M.groups.splice(M.groups.indexOf(group), 1);
        }
      });

    }
    M.setCookies(M.years, M.groups);
    V.renderGroups(M.years, M.classes, M.groups);
    V.uicalendar.clear();
    console.log(M.search);
    if (M.search == '') {
      V.uicalendar.createEvents(M.getEventsByGroup(M.years, M.groups));
    }
    else {
      V.uicalendar.createEvents(M.getEventsByFilter(M.years, M.search));
    }

  }

});


// EVENTS LISTENERS CHANGE
document.querySelector('body').addEventListener('change', function (e) {

  // CHANGEMENT DU GROUPE
  if (e.target.id.includes('group')) {
    let options = e.target && e.target.options;
    M.groups = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        M.groups.push(options[i].value);
      }
    }
    V.uicalendar.clear();
    M.setCookies(M.years, M.groups);

    if (M.search == '') {
      V.uicalendar.createEvents(M.getEventsByGroup(M.years, M.groups));
    }
    else {
      V.uicalendar.createEvents(M.filterEvents(M.getEventsByGroup(M.years, M.groups), M.search));
    }



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
    console.log(e.target.value);
    V.uicalendar.createEvents(M.getEventsByFilter(M.years, e.target.value));
    M.search = e.target.value;
  }
});
