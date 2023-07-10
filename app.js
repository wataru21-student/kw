// 現在の日付
var currentDateElement = document.getElementById("currentDate");
var currentDate = new Date();
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
currentDateElement.textContent =
  "現在の日付: " + currentDate.toLocaleDateString("ja-JP", options);

const monthSelect = document.querySelector(".month");
const salesChartTitle = document.querySelector("#chartTitle");
const rankingContainer = document.querySelector("#rankingTableBody");
let salesChart = null;
// 月の選択が変更された時の処理
monthSelect.addEventListener("change", function () {
  const selectedMonth = monthSelect.value;
  if (selectedMonth !== "") {
    updateSalesChart(selectedMonth);
    updateSalesChartTitle(selectedMonth);
    updateSalesRanking(selectedMonth);
  }
});

// 選択された月の値に基づいてグラフを更新する関数
function updateSalesChart(month) {
  // ダミーデータを生成する例として、ランダムな売り上げデータを作成
  const salesData = generateSalesData(month);

  // Chart.jsの設定オプション
  const chartOptions = {
    type: "bar", // 棒グラフに変更
    data: {
      labels: salesData.labels,
      datasets: [
        {
          label: "売り上げ",
          data: salesData.values,
          borderColor: "blue",
          backgroundColor: "blue", // 背景色も変更
        },
      ],
    },
  };

  // 既存のチャートがあれば破棄して新しいチャートを作成
  if (salesChart) {
    salesChart.destroy();
  }

  // チャートを作成
  const chartCanvas = document.getElementById("salesChart");
  salesChart = new Chart(chartCanvas, chartOptions);
}

// ダミーの売り上げデータを生成する関数
function generateSalesData() {
  // ここで適切な売り上げデータを生成する処理を行います
  // 例えば、月ごとに異なる売り上げデータを表示したい場合は、条件分岐などを使用してデータを設定します
  // この例ではランダムなデータを生成します
  const labels = ["1日", "2日", "3日", "4日", "5日", "6日"]; // ラベル（日付など）
  const values = []; // 売り上げデータ
  // 売り上げデータを生成
  for (let i = 0; i < labels.length; i++) {
    const value = Math.floor(Math.random() * 100); // ランダムな値（例）
    values.push(value);
  }

  return {
    labels: labels,
    values: values,
  };
}
// グラフのタイトルを更新する関数
function updateSalesChartTitle(month) {
  salesChartTitle.textContent = `2023年${month}月の売り上げ推移`; // タイトルを更新
}

// 初回のグラフ表示とランキングトップ5の表示
const selectedMonth = monthSelect.value;
if (selectedMonth !== "") {
  updateSalesChart(selectedMonth);
  updateSalesChartTitle(selectedMonth);
  updateSalesRanking(selectedMonth);
}
