const app = {};

app.apiCall = (coin, color) => {

  fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=d1`).then(function(response) {
    if (response.ok) {
      // returns a ReadableStream that we convert to JSON
      return response.json();
    } else {
      // return a rejected promise object that triggers the catch() method
      return Promise.reject(response);
    }
  }).then(function(response) {

    console.log(response)

    const weeksValues = response.data.slice(-7);
    // map through the last 7 days
    // put priceUSd and date into arrays
    const prices = weeksValues.map(day => {
      // turn into a number, make to two decimal places, add commas
      return parseFloat(day.priceUsd).toFixed(2);

    });

    const dates = weeksValues.map(date => {
      return date.date.slice(0, 10);
    });
  

    const labels = dates;

    // replace() will grab the first instance of 1
    // color.replace('1', '0.5')

    const borderColors = color.split('');

    borderColors.splice(borderColors.length - 2, 1, '0.5');

    const borderColorsString = borderColors.join('');

    const data = {
      labels: labels,
      datasets: [{
        label: 'Price USD',
        backgroundColor: color,
        borderColor: borderColorsString,
        borderWidth: 7,
          data: prices
        }]
      };
            
      const config = {
        type: 'line',
        data,
        options: {}
      };
      
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

    myChart.update();
  

    }).catch(function() {

      const chartContainer = document.querySelector('.chart-container');
      const errorMessage = document.createElement('p');
      errorMessage.innerHTML = "Sorry, something went wrong... try again!";

      chartContainer.append(errorMessage);
      
    });
}

app.init = () => {

  const checkedButton = document.querySelector('input:checked').value;
  const radioButtons = Array.from(document.querySelectorAll('input[name="coin"]'));

  const clickEvent = function() {
    document.querySelector('.wrapper .chart-container').innerHTML = `<canvas id="myChart"></canvas>`
    app.apiCall(this.value, this.getAttribute('data'));
  }

  radioButtons.forEach(radioButton => radioButton.addEventListener('click', clickEvent));

  // initial API call (Bitcoin)
  app.apiCall(checkedButton, 'rgba(239, 142, 25, 1)')

};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
