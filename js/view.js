import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

var CUSTOM_THEME = {
  common: {
    dayName: {
      color: '#000000',
    },
    today: {
      color: 'white',
    },
    timegridOneHour: {
      height: '20px'
    },
    backgroundColor: 'white',
  },

  day: {

  },
  week: {

    nowIndicatorLabel: {
      color: '#20b2aa',
    },
    dayGridLeft: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
      width: '95px',
    },
    timeGridLeft: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
      width: '90px',
    },
    dayName: {
      borderLeft: 'none',
      borderTop: 'none',
      borderBottom: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
    },

    timeGridHalfHourLine: {
      borderBottom: '1px dotted #e5e5e5',
    },
    nowIndicatorPast: {
      border: '1px dashed #20b2aa',
    },
    nowIndicatorToday: {
      border: '1px solid #20b2aa',
    },

    nowIndicatorBullet: {
      backgroundColor: '#20b2aa',
    },
    nowIndicatorFuture: {
      border: '1px solid #20b2aa',
    },

    futureTime: {
      color: '#20b2aa',
    },


  }
};

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
    // timegridOneHour.height:
  },
  month: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
  },
  template: {
    time: function (event) {
      return (
        '<span class="calendar-event-time" style="font-weight: 600; color: #000;">' + event.title + '</span>'
      );
    },
  },

});

V.uicalendar.setTheme(
  CUSTOM_THEME
)



// RENDER GROUPS IN THE SELECT
V.renderGroups = function (years, classes, groups) {
  let html = '';
  let fisrtChild = document.querySelector('#group').firstElementChild.outerHTML;
  let disabled = '<option disabled>—— {{year}} ——</option>';

  for (let year in classes) {
    if (years.includes(year)) {
      html += disabled.replace('{{year}}', year.toUpperCase());
      classes[year].forEach(group => {
        if (groups && groups.includes(group)) {
          html += `<option value="${group}" selected>${group}</option>`;
        }
        else {
          html += `<option value="${group}">${group}</option>`;
        }
      });
    }
  }


  document.querySelector('#group').innerHTML = fisrtChild + html;
}

V.setCookiesPreferences = function (years) {
  let checkboxes = document.querySelectorAll('.checkbox');

  checkboxes.forEach(checkbox => {
    if (years.includes(checkbox.id)) {
      checkbox.checked = true;
    }
  });
}

// CLEAR THE SEARCH BAR
V.clearSearchBar = function () {
  document.querySelector('#search').value = '';
}

// HIDE THE LOADER
V.hideLoader = function () {
  document.querySelector('.loader').classList.add('hidden');
}

// RENDER THE HOURS
V.renderHours = function (hours) {
  let html = '';
  let target = document.querySelector('.navHoursTime');
  let hoursHTML = `<h4 class="navHoursTimeText">${hours.TOTAL}h affichées </br><span>TP: ${hours.TP}h・TD: ${hours.TD}h・CM: ${hours.CM}h</span></h4>`;

  target.innerHTML = hoursHTML;

}

// SET THE VIEW
V.testSupport = function () {
  const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  let selectElement = document.getElementById('time');
  let selectedValue = 'week';


  if (isPhone) {
    V.uicalendar.changeView('day');
    selectedValue = 'day';

  } else {
    V.uicalendar.changeView('week');
    selectedValue = 'week';
  }

  selectElement.value = selectedValue;
  return selectedValue;

}



export { V };
