import { M } from "./js/model.js";
import { V } from "./js/view.js";

// INIT
await M.init();

// let r = /^R[1-6](\.Crea)?(\.Dweb-DI)?\.[0-9]{2}/

// LOCAL STORAGE SETUP
let data = M.getLocalData();

let defaultData = {
  years: ['mmi1', 'mmi2', 'mmi3'],
  groups: ['all']
};

for (let key in defaultData) {
  if (!data[key]) {
    M.setLocalData(key, defaultData[key]);
  }
}

data = M.getLocalData();

M.years = data.years.split(',');
M.groups = data.groups.split(',');




// SETUP
M.timeFrame = V.testSupport();
M.events = M.getEventsByGroup(M.years, M.groups);
V.uicalendar.createEvents(M.events);
V.renderHours(M.countHours(M.events));
V.renderGroups(M.years, M.classes, M.groups);
V.setCookiesPreferences(M.years);



// TEST
V.hideLoader();





// CLICKS EVENTS LISTENERS 
document.querySelector('body').addEventListener('click', function (e) {

  // MOBILE MENU
  if (e.target.classList.contains('mC')) {
    document.querySelector('.navbar').classList.remove('visible');
  }

  // MOBILE MENU
  if (e.target.classList.contains('mO')) {
    document.querySelector('.navbar').classList.add('visible');
  }

  // PREV VIEW
  if (e.target.classList.contains('prev')) {
    V.uicalendar.prev();
    M.viewTimeFrame -= 1;

  }

  // NEXT VIEW
  if (e.target.classList.contains('next')) {
    V.uicalendar.next();
    M.viewTimeFrame += 1;



  }

  // TODAY VIEW
  if (e.target.classList.contains('today')) {
    V.uicalendar.today();
    M.viewTimeFrame = 0;

  }

  // CLEAR SEARCH BAR
  if (e.target.id.includes('search')) {
    V.clearSearchBar();
    V.uicalendar.clear();
    M.events = M.getEventsByGroup(M.years, M.groups);
    V.uicalendar.createEvents(M.events);


  }

  // YEARS CHECKBOXES
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

    if (M.years.length == 0) {
      document.querySelector('.navGroupsSelector').classList.add('hidden');
      document.querySelector('.navDescriptionGroups').classList.add('hidden');

    }
    else {
      document.querySelector('.navGroupsSelector').classList.remove('hidden');
      document.querySelector('.navDescriptionGroups').classList.remove('hidden');

    }

    M.setLocalData('groups', M.groups);
    M.setLocalData('years', M.years);

    V.renderGroups(M.years, M.classes, M.groups);
    V.uicalendar.clear();
    if (M.search == '') {
      M.events = M.getEventsByGroup(M.years, M.groups);
      V.uicalendar.createEvents(M.events);
    }
    else {
      M.events = M.getEventsByFilter(M.years, M.search);
      V.uicalendar.createEvents(M.events);
    }
  }

  V.renderHours(M.countHours(M.events))


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
    M.setLocalData('groups', M.groups);
    M.setLocalData('years', M.years);


    if (M.search == '') {
      M.events = M.filterEvents(M.getEventsByGroup(M.years, M.groups));
      V.uicalendar.createEvents(M.events);
      V.renderHours(M.countHours(M.events))
    }
    else {
      M.events = M.filterEvents(M.getEventsByGroup(M.years, M.groups), M.search);
      V.uicalendar.createEvents(M.events);
      V.renderHours(M.countHours(M.events))
    }
  }

  // CHANGEMENT DE LA VUE
  if (e.target.id.includes('time')) {
    V.uicalendar.changeView(e.target.value);
    M.timeFrame = e.target.value;
    V.renderHours(M.countHours(M.events))

  }

});


// EVENTS LISTENERS KEYUP
document.querySelector('body').addEventListener('keyup', function (e) {

  // RENDER DE LA RECHERCHE
  if (e.target.id.includes('search')) {
    V.uicalendar.clear();
    M.events = M.getEventsByFilter(M.years, M.search);
    V.uicalendar.createEvents(M.events);
    V.renderHours(M.countHours(M.events));
    M.search = e.target.value;
  }
});
