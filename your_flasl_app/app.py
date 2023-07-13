import pandas as pd
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    df = pd.read_csv('your_flasl_app/sales12.csv')  # 'Date' column becomes the index
    df = df.fillna(0)  # Filling missing values (if necessary)

    # Get the list of available months
    months = df.index.tolist()

    if request.method == 'POST':
        month = request.form.get('month')  # Get the month selected by the user
        if month in df.index:  # Check if the selected month exists in the dataframe
            data = df.loc[month].sort_values(ascending=False)[:48].to_dict()
            return jsonify(data)  # Return the data as JSON

    return render_template('sales.html', months=months)  # Pass the list of months to the template

if __name__ == "__main__":
    app.run(debug=True)
