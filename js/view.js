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

V.renderYear = function (year, groups, currentGroup) {
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

V.clearSearchBar = function () {
  document.querySelector('#search').value = '';
}

V.testSupport = function () {
  const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isPhone) {
    V.uicalendar.changeView('Day');
  } else {
    V.uicalendar.changeView('Week');
  }
}


export { V };
