var tabelaCloud = []

function obterDadosTabela(idComputador) {
    fetch(`/processos/ultimos/${idComputador}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                popularTabela(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ tabela: ${error.message}`);
    });
}
function popularTabela(dados) {
    var dadosTabela = []
    tabelaCloud = []
    for (i = 0; i < dados.length; i++) {
        dadosTabela.push({
            PID: `${dados[i].pid}`,
            Processo: `${dados[i].nome}`,
            CPU: `${dados[i].cpu}`,
            RAM: `${dados[i].ram}`,
            Disco: `${dados[i].disco}`
        })
        if (dados[i].nome != "Idle") {
            tabelaCloud.push(
                {"x": dados[i].nome, "value": dados[i].cpu}
            )
        }
    }
    criarTabela(dadosTabela)
}
  
function criarTabela(dados) {
    var divId = 'dynamic-table';
    var div = document.getElementById(divId);

    div.innerHTML = '<span class="loading">Loading...</span>';

    setTimeout(() => {
        div.innerHTML = '';

        var tableId = 'processTable';
        var json = dados
        var table = new DynamicTable(tableId, json);
        div.appendChild(table);

    }, 500);
    }

    window.onload = function() {
    criarTabela(dados);
};

function DynamicTable(tableId, data) {
    var headings = data.reduce(function(result, item) {
        var item_headings = Object.keys(item);

        item_headings.forEach(function(heading) {
        if (result.indexOf(heading) === -1) {
            result.push(heading);
        }
        });

        return result;
    }, []);

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var thead_tr = document.createElement('tr');

    headings.forEach(function(heading) {
        var cell = document.createElement('th');
        cell.innerHTML = heading;

        thead_tr.appendChild(cell);
    });

    data.forEach(function(item) {
        var tbody_tr = document.createElement('tr');

        headings.forEach(function(heading) {
        var cell = document.createElement('td');
        cell.innerHTML = item[heading] || '';

        tbody_tr.appendChild(cell);
        });

        tbody.appendChild(tbody_tr);
    });

    thead.appendChild(thead_tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.id = tableId;

    document.getElementById("botaoModal").style.display = "flex"

    return table;
}

function gerarWordCloud() {
    document.getElementById("modalContainerProc").innerHTML = ""

    anychart.onDocumentReady(function() {
        
        // create a tag (word) cloud chart
        var chart = anychart.tagCloud(tabelaCloud);

        // set a chart title
        chart.title('Processos')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(false);

        // display the word cloud chart
        chart.container("modalContainerProc");
        chart.draw();
    })
}