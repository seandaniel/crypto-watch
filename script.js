// prettier-ignore

const app = {};

app.init = () => {
  fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1").then(function(response) {
    if (response.ok) {
      // returns a ReadableStream that convert to JSON
      return response.json();
    } else {
      // return a rejected promise object that triggers the catch() method
      return Promise.reject(response);
    }
  })
    .then(function(response) {

      const weeksValues = response.data.slice(-7);
      console.log(`7 day response:`, weeksValues)
      // map through the last 7 days
      // put priceUSd and date into arrays

      const prices = weeksValues.map(day => {
        // turn into a number, make to two decimal places, add commas
        return parseFloat(day.priceUsd).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });

      const date = weeksValues.map(date => {
        return date.date.slice(0, 10);
      });
      
      console.log(date, prices);

    }).catch(function(error) {
      console.log(`API Failed ${error}`);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
