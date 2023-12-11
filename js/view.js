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

V.renderGroups = function (year, groups) {
  let html = '';
  let fisrtChild = document.querySelector('#group').firstElementChild.outerHTML;



  groups[year].forEach(group => {
    html += `<option value=${year},BUT${year.charAt(3)}-${group}>${group}</option>`;
  });
  document.querySelector('#group').innerHTML = fisrtChild + html;
}

export { V };
