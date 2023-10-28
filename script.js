let covidDataUSA;
let covidDataIndia;
let maxCases = 0;
let maxDeaths = 0;
let maxRecovered = 0;
let barWidth = 40;
let barSpacing = 40;

function setup() {
  createCanvas(1000, 500);

  // COVID-19 API endpoints for USA and India data
  let urlUSA = 'https://disease.sh/v3/covid-19/countries/USA';
  let urlIndia = 'https://disease.sh/v3/covid-19/countries/India';

  // Call the COVID-19 API for USA
  loadJSON(urlUSA, gotDataUSA);

  // Call the COVID-19 API for India
  loadJSON(urlIndia, gotDataIndia);
}

function gotDataUSA(data) {
  covidDataUSA = data;
  maxCases = Math.max(maxCases, covidDataUSA.cases);
  maxDeaths = Math.max(maxDeaths, covidDataUSA.deaths);
  maxRecovered = Math.max(maxRecovered, covidDataUSA.recovered);
}

function gotDataIndia(data) {
  covidDataIndia = data;
  maxCases = Math.max(maxCases, covidDataIndia.cases);
  maxDeaths = Math.max(maxDeaths, covidDataIndia.deaths);
  maxRecovered = Math.max(maxRecovered, covidDataIndia.recovered);
}

function draw() {
  background(220);

  textSize(20);
  fill(0);

  if (covidDataUSA && covidDataIndia) {
    text('COVID-19 Statistics', 20, 30);
    // Visualize COVID-19 statistics as bar graph
    drawBars(30, covidDataUSA.cases, maxCases, 'Cases (USA)', 'red');
    drawBars(100 + barWidth + barSpacing, covidDataIndia.cases, maxCases, 'Cases (India)', 'red');

    drawBars(330, covidDataUSA.deaths, maxDeaths, 'Deaths (USA)', 'blue');
    drawBars(400 + barWidth + barSpacing, covidDataIndia.deaths, maxDeaths, 'Deaths (India)', 'blue');

    drawBars(630, covidDataUSA.recovered, maxRecovered, 'Recovered (USA)', 'green');
    drawBars(730 + barWidth + barSpacing, covidDataIndia.recovered, maxRecovered, 'Recovered (India)', 'green');
  } else {
    // Show a loading message
    text('Fetching COVID-19 data...', 20, height / 2);
  }
}

function drawBars(x, value, max, label, color) {
  fill(color);
  let barHeight = map(value, 0, max, 0, height - 100);
  rect(x, height - barHeight - 20, barWidth, barHeight);
  fill(0);
  text(label, x, height - 10);
  text(value, x, height - barHeight - 30);
}