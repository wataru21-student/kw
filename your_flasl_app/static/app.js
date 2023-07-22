var ctxBar = document.getElementById("salesChartBar").getContext("2d");
var myChartBar = null; // Initialize myChartBar
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

      // Update the bar chart
      if (myChartBar) {
        myChartBar.destroy(); // Destroy the old chart if it exists
      }
      myChartBar = new Chart(ctxBar, {
        type: "bar",
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

      // Update the ranking
      var rankingList = document.getElementById("rankingList");
      // Clear the current ranking
      while (rankingList.firstChild) {
        rankingList.firstChild.remove();
      }
      // Add the new ranking
      labels.slice(0, 5).forEach((label, i) => {
        var listItem = document.createElement("li");
        listItem.textContent = `${i + 1}. ${label}: ${values[i]}`;
        rankingList.appendChild(listItem);
      });

      // Update the title
      var chartTitle = document.getElementById("chartTitle");
      chartTitle.textContent = `${month}の売上データ（棒グラフ）`;
    });
}

// Add an event listener to the form
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var month = document.querySelector("select[name='month']").value;
  updateChart(month);
});
