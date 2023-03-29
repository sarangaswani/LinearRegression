// This function calculates the slope of the line of best fit given the x and y values.
// It first calculates the average of the x and y values, and then calculates the numerator and denominator of the slope formula.

const calculateSlope = async (xValues, yValues) => {
  
  const xAvg = await calculateAverage(xValues);
  
  const yAvg = await calculateAverage(yValues);
  
  const numerator = await calculateNumerator(xValues, yValues, xAvg, yAvg);
  
  const denominator = await calculateDenominator(xValues, xAvg);
  
  return numerator / denominator;
};

// This function calculates the y-intercept of the line of best fit given the x and y values and the slope.
// It first calculates the average of the x and y values, and then calculates the y-intercept using the slope formula.

const calculateIntercept = async (xValues, yValues, slope) => {
  
  const xAvg = await calculateAverage(xValues);
  
  const yAvg = await calculateAverage(yValues);
  
  return yAvg - slope * xAvg;
};

// This function calculates the x and y values of the points on the line of best fit given the x and y values, slope, and y-intercept.
// It creates an array of point coordinates for each x value, using the slope and y-intercept.

const calculateLine = async (xValues, yValues, slope, intercept) => {
  let linePoints = [];
  for (let i = 0; i < xValues.length; i++) {
    linePoints.push([xValues[i], slope * xValues[i] + intercept]);
  }
  return linePoints;
};

// This function calculates the average of an array of numbers.
// It uses reduce to sum the values, and then divides by the number of values.

const calculateAverage = async (values) => {
  const sum = await values.reduce(async (previousValue, currentValue) => {
    const prev = await previousValue;
    return prev + currentValue;
  }, 0);
  return sum / values.length;
};

// This function calculates the numerator of the slope formula.
// It sums the product of the differences between each x and y value and the respective average values.

const calculateNumerator = async (xValues, yValues, xAvg, yAvg) => {
  let numerator = 0;
  for (let i = 0; i < xValues.length; i++) {
    numerator += (xValues[i] - xAvg) * (yValues[i] - yAvg);
  }
  return numerator;
};

// This function calculates the denominator of the slope formula.
// It sums the squared differences between each x value and the average x value.
const calculateDenominator = async (xValues, xAvg) => {
  let denominator = 0;
  for (let i = 0; i < xValues.length; i++) {
    denominator += (xValues[i] - xAvg) ** 2;
  }
  return denominator;
};

// This function handles the form submission.
// It extracts the x and y values from the input fields, calculates the slope, y-intercept, and line points,
// and then displays the results in the HTML.

const onSubmit = async (event) => {
  event.preventDefault();
  
  // Extract x and y values from input fields.
  const xValues = $('#x-input').val().split(',').map(parseFloat);
  const yValues = $('#y-input').val().split(',').map(parseFloat);
  
  // Calculate slope, y-intercept, and line points.
  const slope = await calculateSlope(xValues, yValues);
  const intercept = await calculateIntercept(xValues, yValues, slope);
  const linePoints = await calculateLine(xValues, yValues, slope, intercept);

  // Display results.
  displayResults(slope, intercept, linePoints);
};


// This function displays the results of the linear regression calculation in the HTML using jQuery
const displayResults = (slope, intercept, linePoints) => {
  $('#slope-result').text(`Slope: ${slope}`);
  $('#intercept-result').text(`Intercept: ${intercept}`);
  $('#line-result').html(`Line: y = ${slope}x + ${intercept}`);
  $('#results-container').removeClass('hidden');
};


// Set the onSubmit function to run when the form is submitted.
$('#linear-regression-form').submit(onSubmit);