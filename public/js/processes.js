var firstFile = [
    {
      company_name: 'Medline Industries, Inc.',
      product: 'Benzalkonium Chloride',
      price: '481.63',
    },
    {
      company_name: 'PD-Rx Pharmaceuticals, Inc.',
      product: 'Alprazolam',
      price: '167.62',
      fda_date_approved: '02/12/2015',
    },
    {
      company_name: 'West-ward Pharmaceutical Corp.',
      product: 'Flumazenil',
      fda_date_approved: '23/04/2015',
    },
    {
      company_name: 'HyVee Inc',
      product: 'Aspirin',
      price: '218.32',
      fda_date_approved: '26/07/2015',
    },
    {
      company_name: 'Aurobindo Pharma Limited',
      product: 'carisoprodol',
      price: '375.58',
      fda_date_approved: '28/11/2014',
    },
    {
      company_name: 'Apotex Corp',
      product: 'Risperidone',
      price: '213.49',
      fda_date_approved: '06/11/2015',
    },
    {
      company_name: 'Unit Dose Services',
      product: 'Lovastatin',
      price: '169.14',
      fda_date_approved: '14/09/2015',
    },
    {
      company_name: 'Jubilant HollisterStier LLC',
      product: 'Dog Hair Canis spp.',
      fda_date_approved: '31/12/2014',
    },
    {
      company_name: 'AAA Pharmaceutical, Inc.',
      product:
        'ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE',
      price: '183.33',
      fda_date_approved: '13/12/2015',
    },
    {
      company_name: 'AKG Innovations LLC',
      product: 'AVOBENZONE, OCTINOXATE, OCTISALATE',
      fda_date_approved: '22/01/2015',
    },
    { company_name: 'hikma Farmaceutica', product: 'Oxytocin' },
    {
      company_name: 'prime Packaging, Inc.',
      product: 'Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone',
      price: '208.17',
    },
    {
      company_name: 'Davion, Inc',
      product: 'Triclosan',
      price: '80.30',
      fda_date_approved: '13/12/2014',
    },
    {
      company_name: 'CARDINAL HEALTH',
      product: 'CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN',
      price: '330.22',
      fda_date_approved: '11/08/2015',
    },
    {
      company_name: 'Amgen Inc',
      product: 'darbepoetin alfa',
      price: '332.28',
      fda_date_approved: '01/07/2015',
    },
    {
      company_name: 'Autumn Harp, Inc.',
      product: 'Salicylic Acid',
      price: '34.43',
      fda_date_approved: '25/03/2015',
    },
    {
      company_name: 'American Regent, Inc.',
      product:
        'sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous',
      price: '11.60',
    },
    {
      company_name: 'J. A. Cosmetics U.S. INC',
      product: 'TITANIUM DIOXIDE',
      price: '130.90',
      fda_date_approved: '01/12/2015',
    },
    {
      company_name: 'NATURE REPUBLIC CO., LTD.',
      product: 'Titanium Dioxide, OCTINOXATE, Zinc Oxide',
      price: '124.48',
    },
    {
      company_name: 'L. Perrigo Company',
      product: 'Dextromethorphan Hydrobromide, Guaifenesin',
      price: '73.09',
      fda_date_approved: '03/02/2016',
    },
  ];
  
  var secondFile = [
    { first_name: 'Billy', last_name: 'Campbell', phone: '62-(500)527-5325' },
    {
      first_name: 'Jonathan',
      last_name: 'Black',
      country: 'Russia',
      phone: '7-(729)811-4597',
    },
    {
      first_name: 'cheryl',
      last_name: 'Harvey',
      country: 'Indonesia',
      phone: '62-(825)454-3810',
    },
    { first_name: 'Cynthia', last_name: 'Cooper' },
    { first_name: 'Thomas', last_name: 'Stevens', phone: '86-(527)535-8464' },
    { first_name: 'Jane', last_name: 'Chavez', country: 'Netherlands' },
    {
      first_name: 'bobby',
      last_name: 'Price',
      country: 'China',
      phone: '86-(898)723-6749',
    },
    { first_name: 'Steve', last_name: 'Hansen', phone: '93-(362)494-5552' },
    {
      first_name: 'Alan',
      last_name: 'Cruz',
      country: 'Philippines',
      phone: '63-(617)248-8832',
    },
    {
      first_name: 'Dennis',
      last_name: 'Baker',
      country: 'Iran',
      phone: '98-(436)329-3723',
    },
    { first_name: 'Ernest', last_name: 'Bishop', phone: '86-(566)429-1138' },
    { first_name: 'Russell', last_name: 'Meyer', phone: '62-(687)827-4302' },
    {
      first_name: 'Ryan',
      last_name: 'Mendoza',
      country: 'Poland',
      phone: '48-(537)109-0373',
    },
    { first_name: 'Maria', last_name: 'Greene', phone: '92-(831)367-8049' },
    {
      first_name: 'Elizabeth',
      last_name: 'Moore',
      country: 'Philippines',
      phone: '63-(694)844-9255',
    },
    { first_name: 'Ronald', last_name: 'kim', phone: '46-(339)931-9221' },
    {
      first_name: 'Samuel',
      last_name: 'Jacobs',
      country: 'Russia',
      phone: '7-(936)156-5229',
    },
    { first_name: 'Fred', last_name: 'Ross', phone: '55-(594)481-7354' },
    {
      first_name: 'Andrew',
      last_name: 'Burns',
      country: 'Portugal',
      phone: '351-(174)443-8706',
    },
    { first_name: 'Robert', last_name: 'Frazier', country: 'Somalia' },
  ];
  
  var fakeFiles = [firstFile, secondFile];
  
  function fetchFakeJson() {
    var file = Math.floor(2 * Math.random());
  
    return fakeFiles[file];
  }
  
  function createTable() {
    var divId = 'dynamic-table';
    var div = document.getElementById(divId);
  
    document.getElementById('customData').value = '';
  
    div.innerHTML = '<span class="loading">Loading...</span>';
  
    setTimeout(() => {
      div.innerHTML = '';
  
      var tableId = 'sortable';
      var json = fetchFakeJson();
      var table = new DynamicTable(tableId, json);
      div.appendChild(table);
  
      new SortableTable(tableId);
    }, 500);
  }
  
  function createTableWithData() {
    var divId = 'dynamic-table';
    var div = document.getElementById(divId);
  
    div.innerHTML = '<span class="loading">Loading...</span>';
  
    setTimeout(() => {
      div.innerHTML = '';
  
      var tableId = 'sortable';
      var json = document.getElementById('customData').value.trim() || '[]';
  
      try {
        json = JSON.parse(json);
  
        if (json.length > 0) {
          var table = new DynamicTable(tableId, json);
          div.appendChild(table);
  
          new SortableTable(tableId);
        } else {
          div.innerHTML = 'Empty collection of data detected';
        }
      } catch (error) {
        div.innerHTML = 'Invalid data. Please validate your data first.';
      }
    }, 100);
  }
  
  window.onload = function() {
    createTable();
  };
  
  /**
   * *******************************************************************
   * **************************** SOLUTION ****************************
   * *******************************************************************
   */
  
  /**
   * *******************************************************************
   * HELPERS: helper functions I use in the solutions
   * *******************************************************************
   */
  
  // Sort helper
  function sortFn(a, b) {
    if (a.value < b.value) {
      return -1;
    }
  
    if (a.value > b.value) {
      return 1;
    }
  
    return 0;
  }
  
  // Sort the list
  function sortList(list, direction) {
    var sorted = list.sort(sortFn);
  
    if (direction === -1) {
      list.reverse();
    }
  
    return sorted;
  }
  
  // Event triggered on heading anchor click (which will trigger the sort)
  function onHeadigClick(that, cellIndex) {
    return function() {
      that.sortColumn(this, cellIndex);
  
      return false;
    };
  }
  
  // Create anchor for each th
  function createAnchor(html, index) {
    var a = document.createElement('a');
    a.href = '#';
    a.innerHTML = html;
    a.onclick = onHeadigClick(this, index);
  
    return a;
  }
  
  /**
   * *******************************************************************
   * TASKS: from here are the real task solutions
   * *******************************************************************
   */
  
  /**
   * Solution for task A. Generate a table with dymanic headers based on the data
   * @param {string} id the id the table will have
   * @param {array} data json data
   *
   * @return {HTMLElement} resulting table
   */
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
  
    return table;
  }
  
  /**
   * Solution for task B. reate a new instance of sortableTable tied to a table
   * @param {string} id table id
   */
  function SortableTable(id) {
    this.table = document.getElementById(id);
    this.lastSortedTh = null;
  
    if (this.table && this.table.nodeName === 'TABLE') {
      var headings = this.table.tHead.rows[0].cells;
  
      Object.assign([], headings).forEach(
        function(heading, index) {
          if (heading.className.match(/ascendent_sort|descendent_sort/)) {
            this.lastSortedTh = heading;
          }
        }.bind(this),
      );
  
      this.setTableSortable();
    }
  }
  
  SortableTable.prototype.setTableSortable = function() {
    var headings = this.table.tHead.rows[0].cells;
  
    Object.assign([], headings).forEach(
      function(heading, index) {
        var sortAnchor = createAnchor.bind(this);
        var html = heading.innerHTML;
        heading.innerHTML = '';
        heading.appendChild(sortAnchor(html, index));
      }.bind(this),
    );
  };
  
  SortableTable.prototype.sortColumn = function(el, cellIndex) {
    var tBody = this.table.tBodies[0];
    var rows = this.table.rows;
    var th = el.parentNode;
    var list = [];
  
    Object.assign([], rows).forEach(function(row, index) {
      if (index > 0) {
        var cell = row.cells[cellIndex];
        var content = cell.textContent || cell.innerText;
  
        list.push({
          value: content,
          row: row,
        });
      }
    });
  
    var hasAscendentClassName = th.className.match('ascendent_sort');
    var hasDescendentClassName = th.className.match('descendent_sort');
  
    list = sortList(list, hasAscendentClassName ? -1 : 1);
  
    if (hasAscendentClassName) {
      th.className = th.className.replace(/ascendent_sort/, 'descendent_sort');
    } else {
      if (hasDescendentClassName) {
        th.className = th.className.replace(/descendent_sort/, 'ascendent_sort');
      } else {
        th.className += 'ascendent_sort';
      }
    }
  
    if (this.lastSortedTh && th !== this.lastSortedTh) {
      this.lastSortedTh.className = this.lastSortedTh.className.replace(
        /descendent_sort|ascendent_sort/g,
        '',
      );
    }
  
    this.lastSortedTh = th;
  
    list.forEach(function(item, index) {
      tBody.appendChild(item.row);
    });
  };