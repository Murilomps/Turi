src = "sweetalert2.all.min.js"
src = "//cdn.jsdelivr.net/npm/sweetalert2@11"


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
let ChartDisk
let ChartSaude
let ChartComponente
let ChartSatisfacaoSemana
let nomeEmp
let idEmp

function baseDataLinha(dtsetlabel) {
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

function baseDataPie(labelsDados) {
  this.labels = labelsDados
  this.datasets = [{
    data: [],
    backgroundColor: ['#4e73df', '#1cc88a'],
    hoverBackgroundColor: ['#2e59d9', '#17a673'],
    hoverBorderColor: "rgba(234, 236, 244, 1)",
  }]
}

function baseDataPie2(labelsDados, cor) {
  this.labels = labelsDados
  this.datasets = [{
    data: [],
    backgroundColor: [cor],
    hoverBackgroundColor: [cor],
    hoverBorderColor: "rgba(234, 236, 244, 1)",
  }]
}

function baseDataBar(dtsetlabel) {
  this.labels = []
  this.datasets = [{
    label: dtsetlabel,
    backgroundColor: ["#D23434", "#D28034", "#96D234", "#D2C234", "#96D234", "#37D234"],
    hoverBackgroundColor: ["#AD2C2C", "#A86629", "#82B62E", "#AEA129", "#82B62E", "#2FB22D"],
    borderColor: "#4e73df",
    data: [],
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

function pieChart(dado, simbolo) {
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

function pieChart2(dado,simbolo,cor) {
  this.type = 'doughnut'
  this.labels = labelsDados
  this.datasets = [{
    data: dado,
    backgroundColor: cor,
    hoverBackgroundColor: cor,
    hoverBorderColor: "rgba(234, 236, 244, 1)",
  }]
  this.options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "#F0FFFF",
      bodyFontColor: "#858796",
      borderColor: cor,
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


function lineChart(dado, simbolo, max_value) {
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
            return value + simbolo;
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

function barChart(dado) {
  this.type = 'bar',
    this.data = dado,
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
            maxTicksLimit: 6
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 12,
            maxTicksLimit: 6,
            padding: 2,
            stepSize: 4,
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
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
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
        }
      },
    }
}
// GRÁFICO BRUNA

// var ctx = document.getElementById("myChartComponente");
// var myPieChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ["RAM", "Disco", "Porcentagem CPU", "Outros"],
//     datasets: [{
//       data: [44, 56,44,20,10],
//       backgroundColor: ['#ADA9A9', '#6959CE','#ADA9A9','#6959CE'],
//       hoverBackgroundColor: ['#6959CE', '#ADA9A9','#6959CE','#ADA9A9'],
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

function alterarTitulo(idComputador) {
  var numpc = document.getElementsByClassName("numMac")
  Array.from(numpc).forEach((idSpan) => {
    idSpan.innerHTML = `${idComputador}`
  })
}

function obterDadosGrafico(idComputador) {
  alterarTitulo(idComputador)

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idComputador}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        obterDadosEst(resposta, idComputador)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterDadosEst(resposta, idComputador) {

  fetch(`/medidas/computador/${idComputador}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta2) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta2)}`);

        plotarGrafico(resposta, idComputador, resposta2)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    
}

function plotarGrafico(resposta, idComputador, resposta2) {

  let dataGeneral = [] //criado para sermos capazes de passar todos os datas como paramêtros para a função atualizarGrafico

  let dataDisk = new baseDataPie(["Em uso", "Livre"])
  let dataCPU = new baseDataLinha("Porcentagem de uso CPU")
  let dataMem = new baseDataLinha("Uso de Memória RAM")
  let dataSaude = new baseDataPie2("Porcentagem de Saúde")


  let totalRAM = resposta2[0].memoria_total
  let totalDisco = resposta2[0].disco_total
  console.log(`Oi, sou a ram ${totalRAM}`)
  console.log(`Oi, sou o disco ${totalDisco}`)

  let discoUsado = resposta[resposta.length - 1].disco_usado
  dataDisk.datasets[0].data.push(discoUsado)
  dataDisk.datasets[0].data.push(totalDisco - discoUsado)

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

    dataCPU.datasets[0].data.push(registro.cpu_porcentagem);
    dataMem.datasets[0].data.push(registro.memoria_usada);
  }

    let cpu = registro.cpu_porcentagem
    let ram = registro.memoria_usada
    let disco = registro.disco_usado
    console.log(`cpu: ${cpu}`)

    // transformando em porcentagem (para individual Débora)
    disco = (disco * 100) / totalDisco 
    ram = (ram * 100) / totalRAM
    
    // saúde
    let saudeDisco = parseInt(disco * 0.333)
    let saudeRam = parseInt(ram * 0.333)
    let saudeCpu = parseInt(cpu * 0.333)
    
    let saudeTotal = (100 - (saudeDisco + saudeRam + saudeCpu))

    console.log(saudeTotal)
    dataSaude.datasets[0].data.push(saudeTotal)

    if(saudeTotal > 0 && saudeTotal < 40) {
      cor = "#FF0000"
    }
    if(saudeTotal > 40 && saudeTotal < 75) {
      cor = "#FFA500"
    }
    if(saudeTotal > 75 && saudeTotal < 100) {
      cor = "#00FF00"
    }
    
    var ctx = document.getElementById("chartSaude");
    if (ChartSaude != null) {
      ChartSaude.destroy();
    }
    ChartSaude = new Chart(ctx, new pieChart2(dataSaude, '%',cor));
    
  

  dataGeneral.push(dataCPU)
  dataGeneral.push(dataMem)
  dataGeneral.push(dataSaude)

  var ctx = document.getElementById("chartDisk1");
  if (ChartDisk != null) {
    ChartDisk.destroy();
  }
  ChartDisk = new Chart(ctx, new pieChart(dataDisk, 'GB'));

  var ctx = document.getElementById("myAreaChart3");
  if (ChartCPU != null) {
    ChartCPU.destroy();
  }
  ChartCPU = new Chart(ctx, new lineChart(dataCPU, '%', 100));

  var ctx = document.getElementById("myAreaChart9");
  if (ChartMem != null) {
    ChartMem.destroy();
  }
  ChartMem = new Chart(ctx, new lineChart(dataMem, 'GB', Math.ceil(totalRAM)));

  
  
  setTimeout(() => atualizarGrafico(idComputador, dataGeneral, totalDisco, totalRAM), 2000);

}

function atualizarGrafico(idComputador, dados, totalDisco, totalRAM) {

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

        // dados.forEach(function (dado) {
        //   dado.labels.shift();
        //   dado.labels.push(horario);
        //   dado.datasets[0].data.shift();
        // })
        
        dados[0].labels.shift();
        dados[0].labels.push(horario);
        dados[0].datasets[0].data.shift();
        dados[1].labels.shift();
        dados[1].labels.push(horario);
        dados[1].datasets[0].data.shift();
        
        dados[0].datasets[0].data.push(novoRegistro[0].cpu_porcentagem);
        dados[1].datasets[0].data.push(novoRegistro[0].memoria_usada);
        
        // let cpu = novoRegistro[0].cpu_porcentagem
        // let ram = novoRegistro[0].memoria_usada
        // let disco = novoRegistro[0].disco_usado
        
        // // transformando em porcentagem (para alertas e individual Débora)
        
        // disco = (disco * 100) / totalDisco 
        // ram = (ram * 100) / totalRAM
      
        // let saudeDisco = parseInt(disco * 0.333)
        // let saudeRam = parseInt(ram * 0.333)
        // let saudeCpu = parseInt(cpu * 0.333)
        
        // let saudeTotal = 100 - (saudeDisco + saudeRam + saudeCpu)
        // console.log(saudeTotal)
        
        // dados[2].datasets[0].data.push(saudeTotal);
        
        ChartCPU.update();
        ChartMem.update();
        ChartSaude.update()

        // verificar(idComputador, cpu, ram, disco, novoRegistro[0].id, totalDisco, totalRAM)

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

function verificar(idComputador, cpu, ram, disco, id_leitura, totalDisco, totalRAM) {
  let cpuAlerta = [cpu, false, 'CPU']
  let ramAlerta = [ram, false, 'RAM']
  let discoAlerta = [disco, false, 'Disco']

  if (disco > 70) {
    if (disco >= 95) {
      Swal.fire(
        "ALERTA: PERIGO! O disco está quase em seu limite. Faça algo!"
      )
    } else {
      Swal.fire(
        "CUIDADO, o disco está ficando muito cheio."
      )
    }
    discoAlerta[1] = true
  }

  if (cpu > 50) {
    if (cpu >= 90) {
      Swal.fire(
        "ALERTA: PERIGO! A CPU está muito sobrecarregada."
      )
    } else {
      Swal.fire(
        "CUIDADO, a porcentagem de uso da CPU está alta."
      )
    }
    cpuAlerta[1] = true
  }

  if (ram > 70) {
    if (ram >= 90) {
      Swal.fire(
        "ALERTA: PERIGO! A RAM está muito cheia."
      )
    } else {
      Swal.fire(
        "CUIDADO, a RAM está ficando cheia."
      )
    }
    ramAlerta[1] = true
  }

  let alertas = [cpuAlerta, ramAlerta, discoAlerta]
  nomeEmp = sessionStorage.NOME_USUARIO;
  alertar(nomeEmp, idComputador, alertas, id_leitura)

}

function alertar(nomeEmp, idComputador, alertas, id_leitura) {
  let card = {
    query: ``
  }
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxNjcyNjYsImVtYWlsIjoidHVyaV9Ab3V0bG9vay5jb20uYnIiLCJhcHBsaWNhdGlvbiI6MzAwMjA1NzM5fX0.o_bj1L7j2n9rRELXyrKY2kz_P9ga6nyAkAy_5chbb3hPnknWCHaDbFhMtASg9zXuawa2DjXghQ4dQ1QyxLcj2A',
      'content-type': 'application/json'
    },
    body: JSON.stringify(card)
  }
  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i][1]) {
      card.query = `mutation { createCard
        (input:{ pipe_id:"302754046,
        title: "Card",
        fields_attributes:
        [{field_id: "empresa", 
        field_value:"${nomeEmp}"},
        {field_id: "id_computador", 
        field_value:"${idComputador}"},
        {field_id: "componente", 
        field_value:"${alertas[i][2]}"},
        {field_id:"mais_informa_es", 
        field_value:"O ${componente} passou de ${alertas[i][0]}% de sua capacidade."}
      ],}){card {title}}}"}`
    };
    fetch('https://api.pipefy.com/graphql', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    fetch("/inserirAlerta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        idServer: id_leitura,
        componenteServer: alertas[i][2],

      })
    }).then(function (resposta) {
      if (resposta.ok) {

        console.log(`Enviados para o banco com sucesso!`)

      } else {

        console.log(`Falha ao enviar para o banco!`)
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    return false;
  }
}

// function temperatureRandom() {
//   let result = [];

//   for (i = 0; i < 5; i++) {
//     result[i] = Math.floor(Math.random() * 11) + 40;
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


function obterDadosGraficoBrumu(idComputador) { // Bruna e murilo, chamem a funcao no onload da pagina. Caso murilo, passar idEmpresa. Pegue o dado de idEmpresa no sessionStorage
  // alterarTitulo(idComputador) // Para Bruna

  // if (proximaAtualizacao != undefined) {
  //   clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/ultimas/${idComputador}`, { cache: 'no-store' }).then(function (response) { // Fazer rotas, controller e model, o qual possuirá o código SQL passado no whatsapp
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        // resposta.reverse();  //MURILO se a ordem aparecer invertida, descomente essa linha

        plotarGraficoBrumu(resposta, idComputador)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoBrumu(resposta) {

  // let dataGeneral = [] //criado para sermos capazes de passar todos os datas como paramêtros para a função atualizarGrafico

  let dataBarBruna = new baseDataBar("Componente")
  let dataBarMurilo = new baseDataBar("Dias")

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    let momentoBanco = new Date(registro.dataDia) // murilo altere para usar somente os dados de dia e mes (e talvez ano, vai de você)
    let horas = String(momentoBanco.getUTCHours());
    while (horas.length < 2) { horas = "0" + horas; }
    let minutos = String(momentoBanco.getUTCMinutes());
    while (minutos.length < 2) { minutos = "0" + minutos; }
    let segundos = String(momentoBanco.getUTCSeconds());
    while (segundos.length < 2) { segundos = "0" + segundos; }
    let horario = `${horas}:${minutos}:${segundos}`

    dataBarMurilo.labels.push(horario);
    dataBarBruna.labels.push(registro.componente)

    dataBarMurilo.datasets[0].data.push(registro.quantidade);
    dataBarBruna.datasets[0].data.push(registro.quantidade);

  }

  var ctx = document.getElementById("chartDisk1"); // Bruna plotagem, removendo possível gráfico de outra máquina
  if (ChartComponente != null) {
    ChartComponente.destroy();
  }
  ChartComponente = new Chart(ctx, new barChart(dataBarBruna));

  var ctx = document.getElementById("chartDisk1"); // murilo plotagem
  ChartSatisfacaoSemana = new Chart(ctx, new barChart(dataBarMurilo));

  // setTimeout(() => atualizarGrafico(idComputador, dataGeneral, totalDisco, totalRAM), 2000);

}



function obterDadosGraficoMu(idEmpresa) { // Bruna e murilo, chamem a funcao no onload da pagina. Caso murilo, passar idEmpresa. Pegue o dado de idEmpresa no sessionStorage
  // alterarTitulo(idComputador) // Para Bruna

  // if (proximaAtualizacao != undefined) {
  //   clearTimeout(proximaAtualizacao);
  // }

  fetch(`/alertas/contarSat/${idEmpresa}`, { cache: 'no-store' }).then(function (response) { // Fazer rotas, controller e model, o qual possuirá o código SQL passado no whatsapp
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();  //MURILO se a ordem aparecer invertida, descomente essa linha

        plotarGraficoMu(resposta, idEmpresa)
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoMu(resposta) {

  // let dataGeneral = [] //criado para sermos capazes de passar todos os datas como paramêtros para a função atualizarGrafico

  let dataBarMurilo = new baseDataBar("Dias")

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    let momentoBanco = new Date(registro.dataDia) // murilo altere para usar somente os dados de dia e mes (e talvez ano, vai de você)
    let horas = String(momentoBanco.getUTCHours());
    while (horas.length < 2) { horas = "0" + horas; }
    let minutos = String(momentoBanco.getUTCMinutes());
    while (minutos.length < 2) { minutos = "0" + minutos; }
    let segundos = String(momentoBanco.getUTCSeconds());
    while (segundos.length < 2) { segundos = "0" + segundos; }
    let horario = `${horas}:${minutos}:${segundos}`

    dataBarMurilo.labels.push(horario);

    dataBarMurilo.datasets[0].data.push(registro.quantidade);

  }


  var ctx = document.getElementById("graphMurilo"); // murilo plotagem
  ChartSatisfacaoSemana = new Chart(ctx, new barChart(dataBarMurilo));

  // setTimeout(() => atualizarGrafico(idComputador, dataGeneral, totalDisco, totalRAM), 2000);

}

  // FUNÇÕES BRUNA

function obterDadosGraficoBruna(idComputador) { // Bruna e murilo, chamem a funcao no onload da pagina. Caso murilo, passar idEmpresa. Pegue o dado de idEmpresa no sessionStorage

  alterarTitulo(idComputador)

  // if (proximaAtualizacao != undefined) {
  //   clearTimeout(proximaAtualizacao);
  // }

  fetch(`/alertas/componente/${idComputador}`, { cache: 'no-store' }).then(function (response) { // Fazer rotas, controller e model, o qual possuirá o código SQL passado no whatsapp
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              // resposta.reverse();  //MURILO se a ordem aparecer invertida, descomente essa linha

              plotarGraficoBruna(resposta)
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na +obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoBruna(resposta) {

    // let dataGeneral = [] //criado para sermos capazes de passar todos os datas como paramêtros para a função atualizarGrafico

    let dataBarBruna = new baseDataBar("Componente")

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        dataBarBruna.labels.push(registro.componente)

        dataBarBruna.datasets[0].data.push(registro.quantidade);

    }

    var ctx = document.getElementById("myChartComponente"); // Plotagem, removendo possível gráfico de outra máquina
    if (ChartComponente != null) {
        ChartComponente.destroy();
    }
    ChartComponente = new Chart(ctx, new barChart(dataBarBruna));

}

// débora


