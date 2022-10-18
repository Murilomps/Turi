// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



// Pie Chart Example


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

var ctx = document.getElementById("chartDisk1");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Em uso", "Livre", "Total", "Buffers+Cache"],
    datasets: [{
      data: [44, 20, 64],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});



var ctx = document.getElementById("chartDisk2");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Em uso", "Livre", "Total", "Buffers+Cache"],
    datasets: [{
      data: [58, 68, 12],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

var ctx = document.getElementById("chartDisk3");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Em uso", "Livre", "Total", "Buffers+Cache"],
    datasets: [{
      data: [30, 12, 25],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
