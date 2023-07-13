var ctx = document.getElementById("myChart").getContext("2d");
var myChart;

// Function to fetch new data and update the chart
function updateChart(month) {
  // Fetch the new data
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "month=" + month,
  })
    .then((response) => response.json())
    .then((data) => {
      var labels = Object.keys(data);
      var values = Object.values(data);

      // Update the chart
      if (myChart) {
        myChart.destroy(); // Destroy the old chart if it exists
      }
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Sales",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
}

// Add an event listener to the form
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var month = document.querySelector("select[name='month']").value;
  updateChart(month);
});
