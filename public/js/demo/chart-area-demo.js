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
    toFixedFix = function (n, prec) {
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

let proximaAtualizacao
let ChartCPU
let ChartMem
let ChartTemp
let ChartDisk

function baseDataLinha (dtsetlabel) {
  this.labels = []                       //HORARIO DA COLETA AQUI
  this.datasets = [{
    label: dtsetlabel,
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
  }]
}

function baseDataPie (labelsDados) {
  this.labels = labelsDados
  this.datasets = [{
    data: [],
    backgroundColor: ['#4e73df', '#1cc88a'],
    hoverBackgroundColor: ['#2e59d9', '#17a673'],
    hoverBorderColor: "rgba(234, 236, 244, 1)",
  }]
}

// function baseDataPie (labelsDados) {
//   this.labels = ["Em uso", "Livre"],
//   this.datasets = [{
//     data: [44, 56],
//     backgroundColor: ['#4e73df', '#1cc88a'],
//     hoverBackgroundColor: ['#2e59d9', '#17a673'],
//     hoverBorderColor: "rgba(234, 236, 244, 1)",
//   }]
// }

function pieChart (dado,simbolo) {
  this.type = 'doughnut'
  this.data = dado
  this.options = {
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
  }
} 

// var ctx = document.getElementById("chartDisk1");
// var myPieChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: ["Em uso", "Livre"],
//     datasets: [{
//       data: [44, 56],
//       backgroundColor: ['#4e73df', '#1cc88a'],
//       hoverBackgroundColor: ['#2e59d9', '#17a673'],
//       hoverBorderColor: "rgba(234, 236, 244, 1)",
//     }],
//   },
//   options: {
//     maintainAspectRatio: false,
//     tooltips: {
//       backgroundColor: "rgb(255,255,255)",
//       bodyFontColor: "#858796",
//       borderColor: '#dddfeb',
//       borderWidth: 1,
//       xPadding: 15,
//       yPadding: 15,
//       displayColors: false,
//       caretPadding: 10,
//     },
//     legend: {
//       display: false
//     },
//     cutoutPercentage: 80,
//   },
// });

function lineChart(dado,simbolo,max_value) {
  this.type = 'line',
  this.data = dado
  this.options = {
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
          max: max_value,
          min: 0,
          callback: function (value, index, values) {
            return number_format(value) + simbolo;
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
}

function obterDadosGrafico(idComputador) {
  // alterarTitulo(idComputador)

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

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
  let dataGeneral = [] //criado para sermos capazes de passar todos os datas como paramêtros para a função atualizarGrafico
  
  let dataDisk = new baseDataPie(["Em uso", "Livre"])
  let dataCPU = new baseDataLinha("Porcentagem de uso CPU")
  let dataMem = new baseDataLinha("Uso de Memória RAM")
  let dataTemp = new baseDataLinha("Temp")

  let discoUsado = resposta[resposta.length - 1].disco_usado
  dataDisk.datasets[0].data.push(discoUsado)
  dataDisk.datasets[0].data.push(237.23 - discoUsado)

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    let momentoBanco = new Date(registro.data_hora)
    let horas = String(momentoBanco.getUTCHours());
    while (horas.length < 2) { horas = "0" + horas; }
    let minutos = String(momentoBanco.getUTCMinutes());
    while (minutos.length < 2) { minutos = "0" + minutos; }
    let segundos = String(momentoBanco.getUTCSeconds());
    while (segundos.length < 2) { segundos = "0" + segundos; }
    let horario = `${horas}:${minutos}:${segundos}`

    dataCPU.labels.push(horario);
    dataMem.labels.push(horario);
    dataTemp.labels.push(horario);

    dataCPU.datasets[0].data.push(registro.cpu_porcentagem);
    dataMem.datasets[0].data.push(registro.memoria_usada);
    dataTemp.datasets[0].data.push(registro.temperatura);

  }

  dataGeneral.push(dataCPU)
  dataGeneral.push(dataMem)
  dataGeneral.push(dataTemp)

  

  var ctx = document.getElementById("chartDisk1");
  if(ChartDisk != null){
    ChartDisk.destroy();
  }
  ChartDisk = new Chart(ctx, new pieChart(dataDisk,'GB'));

  var ctx = document.getElementById("myAreaChart3");
  if(ChartCPU != null){
    ChartCPU.destroy();
  }
  ChartCPU = new Chart(ctx, new lineChart(dataCPU,'%'));

  var ctx = document.getElementById("myAreaChart9");
  if(ChartMem != null){
    ChartMem.destroy();
  }
  ChartMem = new Chart(ctx, new lineChart(dataMem,'GB'));

  // var ctx = document.getElementById("myAreaChart6");
  // if(ChartTemp != null){
  //   ChartTemp.destroy();
  // }
  // ChartTemp = new Chart(ctx, new lineChart(dataTemp));

  setTimeout(() => atualizarGrafico(idComputador, dataGeneral), 2000);

}

function atualizarGrafico(idComputador, dados) {

  fetch(`/medidas/tempo-real/${idComputador}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico: ${dados}`);

        // tirando e colocando valores no gráfico
        
        let momentoBanco = new Date(novoRegistro[0].data_hora)
        let horas = String(momentoBanco.getUTCHours());
        while (horas.length < 2) { horas = "0" + horas; }
        let minutos = String(momentoBanco.getUTCMinutes());
        while (minutos.length < 2) { minutos = "0" + minutos; }
        let segundos = String(momentoBanco.getUTCSeconds());
        while (segundos.length < 2) { segundos = "0" + segundos; }
        let horario = `${horas}:${minutos}:${segundos}`

        dados.forEach(function (dado) {
          dado.labels.shift();
          dado.labels.push(horario);
          dado.datasets[0].data.shift();
        })

        dados[0].datasets[0].data.push(novoRegistro[0].cpu_porcentagem);
        dados[1].datasets[0].data.push(novoRegistro[0].memoria_usada);
        dados[2].datasets[0].data.push(novoRegistro[0].temperatura);
        
        ChartCPU.update();
        ChartMem.update();
        ChartTemp.update();

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, dados), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, dados), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

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
    ]
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
    ]
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
// var myLineChart4 = new Chart(ctx, {
//   type: 'line',
//   data: data4,

//   options: {
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         left: 10,
//         right: 25,
//         top: 25,
//         bottom: 0
//       }
//     },
//     scales: {
//       xAxes: [{
//         time: {
//           unit: 'date'
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//         ticks: {
//           maxTicksLimit: 7
//         }
//       }],
//       yAxes: [{
//         ticks: {
//           maxTicksLimit: 5,
//           padding: 10,
//           beginAtZero: true,
//           max: 100,
//           min: 0,
//           callback: function (value, index, values) {
//             return number_format(value) + '%';
//           }
//         },
//         gridLines: {
//           color: "rgb(234, 236, 244)",
//           zeroLineColor: "rgb(0, 0, 0)",
//           drawBorder: false,
//           borderDash: [2],
//           zeroLineBorderDash: [2]
//         }
//       }],
//     },
//     legend: {
//       display: false
//     },
//     tooltips: {
//       backgroundColor: "rgb(255,255,255)",
//       bodyFontColor: "#858796",
//       titleMarginBottom: 10,
//       titleFontColor: '#6e707e',
//       titleFontSize: 14,
//       borderColor: '#dddfeb',
//       borderWidth: 1,
//       xPadding: 15,
//       yPadding: 15,
//       displayColors: false,
//       intersect: false,
//       mode: 'index',
//       caretPadding: 10,
//       callbacks: {
//         label: function (tooltipItem, chart) {
//           var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//           return datasetLabel + ':' + number_format(tooltipItem.yLabel) + '%';
//         }
//       }
//     }
//   }
// });

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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'C°';
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'C°';
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'C°';
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'GB';
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'GB';
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
          callback: function (value, index, values) {
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
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ':' + number_format(tooltipItem.yLabel) + 'C°';
        }
      }
    }
  }
});