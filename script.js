const app = {};


app.apiCall = (coin) => {

  fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=d1`).then(function(response) {
    if (response.ok) {
      // returns a ReadableStream that convert to JSON
      return response.json();
    } else {
      // return a rejected promise object that triggers the catch() method
      return Promise.reject(response);
    }
  })
    .then(function(response) {

      console.log(response)

      const weeksValues = response.data.slice(-7);
      console.log(`7 day response:`, weeksValues)
      // map through the last 7 days
      // put priceUSd and date into arrays
      const prices = weeksValues.map(day => {
        // turn into a number, make to two decimal places, add commas
        return parseFloat(day.priceUsd).toFixed(2);

      });

      const dates = weeksValues.map(date => {
        return date.date.slice(0, 10);
      });
      
      console.log(dates, prices);

      const labels = dates

      const data = {
        labels: labels,
        datasets: [{
          label: 'Price USD',
          backgroundColor: '#CBAA57',
          borderColor: '#8B6825',
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
    

    }).catch(function(error) {
      console.log(`API Failed ${error}`);
    });
}

app.init = () => {

  const checked = document.querySelector('input:checked').value;

  const radioButtons = Array.from(document.querySelectorAll('input[name="coin"]'));

  const clickEvent = () => {
    console.log('click');
  }

  radioButtons.forEach(radioButton.addEventListener('click'));


  console.log(radioButtons);

  app.apiCall(checked)

};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
