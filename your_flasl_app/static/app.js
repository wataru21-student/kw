var ctxBar = document.getElementById("salesChartBar").getContext("2d");
var myChartBar = null; // myChartBarを初期化

// 数値をタイトルにマッピングする関数
function mapNumberToTitle(number) {
  switch (number) {
    case "Date":
      return "わーいお茶";
    case "0":
      return "わーい緑茶";
    case "1":
      return "わーい濃茶";
    case "2":
      return "右衛門";
    case "3":
      return "カテキン茶";
    case "4":
      return "お生茶";
    case "5":
      return "玉露っちゃ";
    case "6":
      return "にごる茶";
    case "7":
      return "バーヤリスオレンジ";
    case "8":
      return "バーヤリスアップル";
    case "9":
      return "カルパスウォーター";
    case "10":
      return "ワンワ金の微糖";
    case "11":
      return "ワンワブラック";
    case "12":
      return "フォンタグレープ";
    case "13":
      return "フォンタオレンジ";
    case "14":
      return "フォンタメロン";
    case "15":
      return "サプライト";
    case "16":
      return "コッコーラ";
    case "17":
      return "コッコーラゼロ";
    case "18":
      return "パプシコーラ";
    case "19":
      return "パプシコーラゼロ";
    case "20":
      return "ななちゃん";
    case "21":
      return "Gakuri";
    case "22":
      return "アセルラドリンク";
    case "23":
      return "はちむつレモン";
    case "24":
      return "ポスブラック";
    case "25":
      return "ポスブレンド";
    case "26":
      return "ポスカフェオレ";
    case "27":
      return "トロピカルレモン";
    case "28":
      return "レモーネ紅茶";
    case "29":
      return "アップルティー";
    case "30":
      return "紅茶花壇";
    case "31":
      return "オレンジーナ";
    case "32":
      return "松屋サイダー";
    case "33":
      return "キリリレモン";
    case "34":
      return "スーコル";
    case "35":
      return "ジャージアコーヒー";
    case "36":
      return "ジャージア微糖";
    case "37":
      return "ジャージアブラック";
    case "38":
      return "濃いミカン";
    case "39":
      return "メロンソーダ";
    case "40":
      return "おいしい葡萄";
    case "41":
      return "練乳イチゴ";
    case "42":
      return "抹茶ラテ";
    case "43":
      return "リアルゴール";
    case "44":
      return "KA・RA・DA";
    case "45":
      return "ポッカリスエット";
    case "46":
      return "午前の紅茶";
    case "47":
      return "アクアリアス";
    case "48":
      return "カルパスオレンジ";
  }
}

// 新しいデータを取得してチャートを更新する関数
function updateChart(month) {
  // 新しいデータを取得
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

      // ラベルと値のペアの配列を作成
      var pairs = labels.map((label, i) => [label, values[i]]);

      // ペアの配列を値で降順にソート
      pairs.sort((a, b) => b[1] - a[1]);

      // ペアをラベルと値に分割
      labels = pairs.map((pair) => pair[0]);
      values = pairs.map((pair) => pair[1]);

      // バーチャートを更新
      if (myChartBar) {
        myChartBar.destroy(); // 古いチャートが存在する場合は破棄
      }
      myChartBar = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: labels.map(mapNumberToTitle), // マッピング関数を適用
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
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90,
              },
            },
          },
        },
      });
      // ランキングを更新
      var rankingList = document.getElementById("rankingList");
      // 現在のランキングをクリア
      while (rankingList.firstChild) {
        rankingList.firstChild.remove();
      }
      // 新しいランキングを追加
      pairs.slice(0, 15).forEach((pair, i) => {
        var listItem = document.createElement("li");
        // 商品名を太字
        var productName = document.createElement("strong");
        productName.textContent = mapNumberToTitle(pair[0]);
        productName.style.color = "blue"; // 青色にする
        listItem.innerHTML = `${i + 1}位: ${productName.outerHTML} - 売上: ${
          pair[1]
        }`;
        rankingList.appendChild(listItem);
      });
      // タイトルを更新
      var chartTitle = document.getElementById("chartTitle");
      chartTitle.textContent = `${month}の売上データ（棒グラフ）`;
    });
}

// フォームにイベントリスナーを追加
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var month = document.querySelector("select[name='month']").value;
  updateChart(month);
});
