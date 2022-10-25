
import bootstrap from 'bootstrap';
//import p5 from 'p5';
import Plotly from 'plotly.js-dist-min';

/*
let table: p5.Table;

const sketch = (p: p5) => {
  p.preload = () => {
    table: p5.Table = p.loadTable("assets/sleep-study-data.csv", "header");
  }
  
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background('#3178c6');
  };
};

let myp5 = new p5(sketch);


// Convert saved Bubble data into Bubble Objects
function loadData() {
  const data = table.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  const length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    // Get position, diameter, name,
    const x = data[i].getNum("x");
    const y = data[i].getNum("y");
    const diameter = data[i].getNum("diameter");
    const name = data[i].getString("name");

    // Put object in array
    
  }
}

loadData();
*/

var trace1: Plotly.Data = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'markers',
  type: 'scatter'
};

var trace2: Plotly.Data = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  mode: 'lines',
  type: 'scatter'
};

var trace3: Plotly.Data = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines+markers',
  type: 'scatter'
};

var data: Plotly.Data[] = [trace1, trace2, trace3];

Plotly.newPlot('tester', data);
