import pandas as pd

# CSVファイルを読み込む
df = pd.read_csv('your_flasl_app/sales12.csv')

# 列名を表示する
print(df.columns)

# 最初の5行を表示する
print(df.head())
