import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function (event) {
      return `<span style="color: white;">${event.title}</span>`;
    },
  },
});


// RENDER OF THE GROUPS OPTIONS IN THE SELECT
V.renderGroups = function (year, groups, currentGroup) {
  let html = '';
  let fisrtChild = document.querySelector('#group').firstElementChild.outerHTML;

  groups[year].forEach(group => {
    let fullGroup = `BUT${year.charAt(3)}-${group}`;

    if (fullGroup == currentGroup) {
      html += `<option value=${fullGroup} selected>${group}</option>`;
    }
    else {
      html += `<option value=BUT${year.charAt(3)}-${group}>${group}</option>`;
    }
  });

  document.querySelector('#group').innerHTML = fisrtChild + html;
}

// RENDER OF THE YEARS OPTIONS IN THE SELECT
V.renderYear = function (currentYear, years) {
  let html = '';
  let fisrtChild = document.querySelector('#year').firstElementChild.outerHTML;
  for (const year in years) {

    if (year == currentYear) {
      html += `<option value=${year} selected>${year.toUpperCase()}</option>`;
    }
    else {
      html += `<option value=${year}>${year.toUpperCase()}</option>`;
    }

  }
  document.querySelector('#year').innerHTML = fisrtChild + html;
}

// CLEAR THE SEARCH BAR
V.clearSearchBar = function () {
  document.querySelector('#search').value = '';
}

// SET THE VIEW
V.testSupport = function () {
  const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isPhone) {
    V.uicalendar.changeView('day');
  } else {
    V.uicalendar.changeView('week');
  }
}



export { V };
