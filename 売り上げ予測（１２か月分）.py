import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
import matplotlib.pyplot as plt

# データの作成（仮想的なデータ）
csv_path = "sales.csv"
temperature_path = "temp_new.csv"

# CSVファイルの読み込み
data = pd.read_csv(csv_path)
temperature_data = pd.read_csv(temperature_path)

# データの結合
data = pd.concat([data, temperature_data], axis=1)
print(data)

# 特徴量とターゲット変数の分割
X = data[['湿度', '気温']]
y = data.drop(['湿度', '気温'], axis=1)

# ランダムフォレストモデルの作成と訓練
model = HistGradientBoostingRegressor()

# 50個の商品ごとに予測結果を格納するリスト
all_predictions = []

# 50個の商品に対して予測を実行
for item_id in range(50):
    # 特徴量とターゲット変数の分割
    X_item = X.copy()
    y_item = y[str(item_id)]  # ターゲット変数を取得

    # モデルの訓練
    model.fit(X_item, y_item)

    # 未来のデータでの売り上げを予測
    future_data = pd.DataFrame({'湿度': [65], '気温': [20.2]})
    predicted_sales = model.predict(future_data)

    # 12か月分の売り上げを予測
    predictions = []
    current_date = pd.to_datetime(data.index[-1])

    for _ in range(12):
        new_date = current_date + pd.DateOffset(months=1)
        new_data = pd.DataFrame({'湿度': [65], '気温': [20.2]})
        predicted_sales = model.predict(new_data)
        predictions.append(predicted_sales[0])
        current_date = new_date

        # 新しいデータを追加してモデルを更新
        X_item = pd.concat([X_item, new_data])
        y_item = pd.concat([y_item, pd.Series(predicted_sales[0])])
        model.fit(X_item, y_item)

    # 予測結果を全体のリストに追加
    all_predictions.append(predictions)

# 予測結果の表示
print('50個の商品の12か月分の売り上げ予測:')
for item_id, item_predictions in enumerate(all_predictions, start=1):
    print(f'商品{item_id}:', item_predictions)

# 予測結果の可視化
fig, ax = plt.subplots(figsize=(15, 8), dpi=50)

for item_id, item_predictions in enumerate(all_predictions, start=1):
    ax.plot(range(1, 13), item_predictions, label=f"商品{item_id}")

ax.set_xlabel("月")
ax.set_ylabel("売上")
ax.legend()

plt.show()
