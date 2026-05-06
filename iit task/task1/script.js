const xSlider = document.getElementById("xRange");
const ySlider = document.getElementById("yRange");

const xVal = document.getElementById("xValue");
const yVal = document.getElementById("yValue");

const xOut = document.getElementById("xOut");
const yOut = document.getElementById("yOut");
const logOut = document.getElementById("logOut");

const resetBtn = document.getElementById("resetBtn");


let yValues = [];
let logXValues = [];

let ctx = document.getElementById("logChart").getContext("2d");

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: yValues,
    datasets: [{
      label: 'log₁₀(x) vs y',
      data: logXValues,
      borderColor: 'blue',
      fill: false,
      tension: 0.2,
      pointRadius: 4
    }]
  },
  options: {
    responsive: false,
    scales: {
      x: {
        title: { display: true, text: 'Y' }
      },
      y: {
        title: { display: true, text: 'log₁₀(x)' }
      }
    }
  }
});

function updateValues() {
  let x = parseFloat(xSlider.value);
  let y = parseFloat(ySlider.value);
  let logX = Math.log10(x).toFixed(3);

  xVal.textContent = x;
  yVal.textContent = y;

  xOut.textContent = x;
  yOut.textContent = y;
  logOut.textContent = logX;

  
  yValues.push(y);
  logXValues.push(parseFloat(logX));

  chart.update();
}


resetBtn.addEventListener("click", function () {
  yValues.length = 0;
  logXValues.length = 0;
  chart.update();
});

xSlider.addEventListener("input", updateValues);
ySlider.addEventListener("input", updateValues);


updateValues();
