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


// RENDER GROUPS IN THE SELECT
V.renderGroups = function (years, groups) {
  let html = '';
  let fisrtChild = document.querySelector('#group').firstElementChild.outerHTML;
  let disabled = '<option disabled>—— {{year}} ——</option>';

  for (let year in groups) {
    if (years.includes(year)) {
      html += disabled.replace('{{year}}', year.toUpperCase());
      groups[year].forEach(group => {
        html += `<option value="${group}">${group}</option>`;
      });
    }
  }


  document.querySelector('#group').innerHTML = fisrtChild + html;
}

V.setCookiesPreferences = function (years, groups) {
  let checkboxes = document.querySelectorAll('.checkbox');

  checkboxes.forEach(checkbox => {
    if (years.includes(checkbox.id)) {
      checkbox.checked = true;
    }
  });


}

V.renderCalendarByYear = function (events) {
  V.uicalendar.clear();
  V.uicalendar.createEvents(events);
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
