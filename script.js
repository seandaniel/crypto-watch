// prettier-ignore

const app = {};

app.init = () => {
  fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1").then(function(response) {
    // promise
    return response.json();
  })
    .then(function(response) {
      console.log(response.data);

      const lastArrayItem = response.data.length - 1
      console.log(response.data[728])
      // map through the last 7 days
      // put priceUSd and date into arrays
    });
};

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
