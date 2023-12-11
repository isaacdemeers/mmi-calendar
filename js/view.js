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

V.setColor = function () {
  V.uicalendar.setCalendarColor('mmi1', {
    backgroundColor: '#d56060',
  });
  V.uicalendar.setCalendarColor('mmi2', {
    backgroundColor: '#60d584',
  });
  V.uicalendar.setCalendarColor('mmi3', {
    backgroundColor: '#6095d5',
  });
}

export { V };
