import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
import requests
import json

dataset = pd.read_csv('house.csv')
dataset.head(5)
dataset.dropna(inplace = True)
dataset=dataset.stack(dropna=False)
dataset=pd.to_numeric(dataset,errors='coerce').fillna(0).unstack()
dataset = dataset.apply(pd.to_numeric, errors='coerce')
dataset = dataset.astype('int64')


X_var = dataset[['IUDir', 'DisColl', 'IUBalc', 'Garage', 'BYEAR', 'NROOMS', 'NBATH','DisHos','DisMall', 'DisMetro', 'FlrLoc', 'Elav', 'Complex', 'IUM²']].values
y_var = dataset['Price'].values

X_train, X_test, y_train, y_test = train_test_split(X_var, y_var, test_size = 0.1, random_state = 0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)

pickle.dump(regressor, open('model.pkl','wb'))
model = pickle.load(open('model.pkl','rb'))
