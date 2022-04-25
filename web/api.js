var ctxL = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctxL, {
  type: 'line',
  data: {
    // labels: timestamp,
    datasets: [{
      label: 'Device A',
      backgroundColor: ['rgba(105, 0, 132, .2)'],
      borderColor: ['rgba(200, 99, 132, .7)'],
      borderWidth: 2
    },
    {
      label: 'Device B',
      backgroundColor: ['rgba(0, 137, 132, .2)'],
      borderColor: ['rgba(0, 10, 130, .7)'],
      borderWidth: 2
    }
    ]
  },
  options: {
    responsive: true
  }
});;

var updateInterval = 2000;
setInterval(function () { fetchData() }, updateInterval);

function fetchData() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:10000/temps"//
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      processData(this.responseText)
    }
    //updateChart()
  }
}


function processData(data) {
  var data = JSON.parse(data);

  var timestamp = data.map(function (elem) {
    var myDate = new Date(elem.timestamp);
    return myDate.toLocaleString();
  });
  var deviceA = data.filter(e => e.deviceid == "deviceA").map(e => e.temperature);
  var deviceB = data.filter(e => e.deviceid == "deviceB").map(e => e.temperature);
  addData(chart, 0, deviceA, timestamp)
  addData(chart, 1, deviceB, timestamp)
  chart.update();
}

function addData(chart, device, data, label) {
  chart.data.labels.push(label);
  chart.data.datasets[device].data.push(data);
}