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

// function obterDadosGrafico(idComputador) {

//   // if (proximaAtualizacao != undefined) {
//   //     clearTimeout(proximaAtualizacao);
//   // }

//   fetch(`/medidas/ultimas/${idComputador}`, { cache: 'no-store' }).then(function (response) {
//       if (response.ok) {
//           response.json().then(function (resposta) {
//               console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//               resposta.reverse();

//               // inserirDados(resposta, idComputador);
//           });
//       } else {
//           console.error('Nenhum dado encontrado ou erro na API');
//       }
//   })
//       .catch(function (error) {
//           console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//       });
// }

// function inserirDados(resposta, idComputador) {
//   console.log('iniciando plotagem do gráfico...');

//   for (i = 0; i < resposta.length; i++) {
//       var registro = resposta[i];
//       dados.labels.push(registro.momento_grafico);

//       dados.datasets[0].data.push(registro.umidade);
//       dados.datasets[1].data.push(registro.temperatura);

//   }
// }




let currentdate = new Date()

let currentTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();


function obterDadosGrafico(idComputador) {
  // alterarTitulo(idComputador)

  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimas/${idComputador}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGrafico(resposta, idComputador);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGrafico(resposta, idComputador) {
  var dados = {
    labels: [],
    datasets: [
        {
            yAxisID: 'yAxisID',
            label: 'labelYAxis',
            borderColor: '#32B9CD',
            backgroundColor: '#32b9cd8f',
            fill: true,
            data: []
        }
    ]
};
  
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.data.labels.push(registro.data_hora);
  
    dados.data.datasets.data.push(registro.umidade);
  }
}



// function cpuRandom() {
//   let result = [];
  
//   for (i = 0; i < 5; i++) {
//     result[i] = Math.floor(Math.random() * 41) + 10;
//   }
//   return result
// }

// function temperatureRandom() {
//   let result = [];
  
//   for (i = 0; i < 5; i++) {
//     result[i] = Math.floor(Math.random() * 11) + 40;
//   }
//   return result
// }

// function memoryRandom() {
//   let result = [];
  
//   let rand = (Math.floor(Math.random() * 301))/100 + 2

//   for (i = 0; i < 5; i++) {
//     result[i] = rand;
//   }
//   return result
// }

console.log(obterDadosGrafico(1), "aaaaaaaaaaaaaaaa")


// Gráficos de CPU (temperatura e porcentagem de uso)

var ctx = document.getElementById("myAreaChart");
var myLineChart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2, currentTime2],
    datasets: [{
      label: "Porcentagem de Uso - Máquina 1",
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
      data: [],
    },
  ]},

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

var ctx = document.getElementById("myAreaChart2");
var myLineChart2 = new Chart(ctx, {
  type: 'line',
  data: {
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
    }
    ]},

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

// gráfico de porcentagem de cpu máquina 1 

var ctx = document.getElementById("myAreaChart3");
var data3 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                       //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Porcentagem de Uso (CPU) - Máquina 1",
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
    data: 1,
  }]
}
var myLineChart3 = new Chart(ctx, {
  type: 'line',
  data: data3,

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
          callback: function(value, index, values) {
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
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + '%' ;
        }
      }
    }
  }
});


// gráfico  de porcentagem da cpu máquina máquina 2
var data4 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Porcentagem de Uso (CPU) - Máquina 2",
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
    data: 1,
  },],
}
var ctx = document.getElementById("myAreaChart4");
var myLineChart4 = new Chart(ctx, {
  type: 'line',
  data: data4,

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
          callback: function(value, index, values) {
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
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + '%' ;
        }
      }
    }
  }
});

// gráfico  de porcentagem da cpu máquina máquina 3

var data5 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Porcentagem de Uso (CPU) - Máquina 3",
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
    data: 1,
  },],
}
var ctx = document.getElementById("myAreaChart5");
var myLineChart5 = new Chart(ctx, {
  type: 'line',
  data: data5,
  
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
          callback: function(value, index, values) {
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
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + '%' ;
        }
      }
    }
  }
});

var data6 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
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
    data: 1,
  },],
}
var ctx = document.getElementById("myAreaChart6");
var myLineChart6 = new Chart(ctx, {
  type: 'line',
  data: data6,

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
          callback: function(value, index, values) {
            return number_format(value) + 'C°';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'C°' ;
        }
      }
    }
  }
});

var data7 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Temperatura - Máquina 2",
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
    data: 1,
  },],
}
var ctx = document.getElementById("myAreaChart7");
var myLineChart7 = new Chart(ctx, {
  type: 'line',
  data: data7,

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
          callback: function(value, index, values) {
            return number_format(value) + 'C°';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'C°' ;
        }
      }
    }
  }
});

// gráfico  de temperatura da cpu máquina máquina 3
var data8 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Temperatura - Máquina 3",
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
    data: 1,
  },],
}
var ctx = document.getElementById("myAreaChart8");
var myLineChart8 = new Chart(ctx, {
  type: 'line',
  data: data8,

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
          callback: function(value, index, values) {
            return number_format(value) + 'C°';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'C°' ;
        }
      }
    }
  }
});

var data9 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Memória - Máquina 1",
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
    data: 1,
  },],
}

var ctx = document.getElementById("myAreaChart9");
var myLineChart9 = new Chart(ctx, {
  type: 'doughnut',
  data: data9,

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
          max: 8,
          min: 0,
          callback: function(value, index, values) {
            return number_format(value) + 'GB';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'GB' ;
        }
      }
    }
  }
});

var data10 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Memoria - Máquina 2",
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
    data: 1,
  },],
}

var ctx = document.getElementById("myAreaChart10");
var myLineChart10 = new Chart(ctx, {
  type: 'line',
  data: data10,

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
          max: 8,
          min: 0,
          callback: function(value, index, values) {
            return number_format(value) + 'GB';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'GB' ;
        }
      }
    }
  }
});

var data11 = {
  labels: [currentTime, currentTime, currentTime, currentTime, currentTime],                          //HORARIO DA COLETA AQUI
  datasets: [{
    label: "Memoria - Máquina 3",
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
    data: 1,
  },],
}

var ctx = document.getElementById("myAreaChart11");
var myLineChart11 = new Chart(ctx, {
  type: 'line',
  data: data11,

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
          max: 8,
          min: 0,
          callback: function(value, index, values) {
            return number_format(value) + 'GB';
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
          return datasetLabel + ':'  + number_format(tooltipItem.yLabel) + 'C°' ;
        }
      }
    }
  }
});