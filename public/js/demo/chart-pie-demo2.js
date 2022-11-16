
var data1 = {
  labels: [currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2],
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
    data: cpuRandom(),
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
    data: cpuRandom(),
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
    data: cpuRandom(),
  }]
}

var ctx = document.getElementById("myAreaChart");
var myLineChart1 = new Chart(ctx, {
  type: 'line',
  data: data1,

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
          beginAtZero: true,
          max: 100,
          min: 0,
          callback: function (value, index, values) {
            return number_format(value) + '%';
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + '%';
        }
      }
    }
  }
});

var data2 = {
  labels: [currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2],
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
    data: temperatureRandom(),
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
    data: temperatureRandom(),
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
    data: temperatureRandom(),
  }]
}

var ctx = document.getElementById("myAreaChart2");
var myLineChart2 = new Chart(ctx, {
  type: 'line',
  data: data2,

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
          beginAtZero: true,
          max: 100,
          min: 0,
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + '°C';
        }
      }
    }
  }
});

var ctx = document.getElementById("chartDisk2");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Em uso", "Livre"],
    datasets: [{
      data: [42, 58],
      backgroundColor: ['#4e73df', '#1cc88a'],
      hoverBackgroundColor: ['#2e59d9', '#17a673'],
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
