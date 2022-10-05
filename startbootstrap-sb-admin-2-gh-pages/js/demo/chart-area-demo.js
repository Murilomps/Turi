// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["13:44:09", "13:46:09", "13:48:09", "13:50:09", "13:52:09", "13:54:09", "13:56:09", "13:58:09", "14:00:09", "14:02:09", "14:04:09", "14:06:09"],
    datasets: [{
      label: "Frequência - Máquina 1",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223,0)",
      borderColor: "rgb(105, 89, 206)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(105, 89, 206)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.91, 0.85, 0.95, 1.00, 1.20, 0.92, 0.97, 0.91, 0.89, 0.94, 0.91, 0.89],
    },
    { 
      label: "Frequência - Máquina 2",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0)",
      borderColor: "rgb(96, 25, 115)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(96, 25, 115)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.85, 0.89, 0.91, 0.95, 0.98, 1.00, 1.20, 1.10, 1.06, 1.01, 0.99, 0.95],
    },
    { 
      label: "Frequência - Máquina 3",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0)",
      borderColor: "rgb(95, 59, 160)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(96, 25, 115)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.91, 0.89, 0.91, 0.95, 0.98, 1.01, 1.06, 1.10, 1.03, 1.00, 0.97, 0.92],
    },

],
    
  },

  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value) + 'GhZ';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(0, 0, 0)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'GhZ' ;
        }
      }
    }
  }
});

var ctx = document.getElementById("myAreaChart2");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["13:44:09", "13:46:09", "13:48:09", "13:50:09", "13:52:09", "13:54:09", "13:56:09", "13:58:09", "14:00:09", "14:02:09", "14:04:09", "14:06:09"],
    datasets: [{
      label: "Temperatura - Máquina 1",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223,0)",
      borderColor: "rgb(105, 89, 206)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(105, 89, 206)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [23.5, 24.6, 22.9, 23.3, 25.2, 23.8, 23.9, 24.5, 24.8, 25.8, 21.9, 29.9],
    },
    { 
      label: "Temperatura - Máquina 2",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0)",
      borderColor: "rgb(96, 25, 115)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(96, 25, 115)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.85, 0.89, 0.91, 0.95, 0.98, 1.00, 1.20, 1.10, 1.06, 1.01, 0.99, 0.95],
    },
    { 
      label: "Temperatura - Máquina 3",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0)",
      borderColor: "rgb(95, 59, 160)",
      pointRadius: 3,
      pointBackgroundColor: "rgb(105, 89, 206)",
      pointBorderColor: "rgb(96, 25, 115)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.91, 0.89, 0.91, 0.95, 0.98, 1.01, 1.06, 1.10, 1.03, 1.00, 0.97, 0.92],
    },

],
    
  },

  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value) + '°C';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(0, 0, 0)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + '°C' ;
        }
      }
    }
  }
});

