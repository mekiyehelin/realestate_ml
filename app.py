from sys import stderr

from flask import Flask, render_template, request
import pickle
import numpy as np
from math import sin, cos, sqrt, atan2, radians

app = Flask(__name__)

model = pickle.load(open('model.pkl', 'rb'))
col=['IUDir', 'DisColl', 'IUBalc', 'Garage', 'BYEAR', 'NROOMS', 'NBATH','DisHos','DisMall', 'DisMetro', 'FlrLoc', 'Elav', 'Complex', 'IUM²']


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/predict', methods=['POST', 'GET'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final=[np.array(int_features, dtype=int)]
    prediction=model.predict(final)
    output=round(prediction[0],0)

    return render_template('index.html', pred='Aradığınız evin yaklaşık fiyatı; {} TRY.'.format(output))


if __name__ == '__main__':
    app.run(debug=True)