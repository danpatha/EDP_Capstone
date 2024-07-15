from pymongo import MongoClient
import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors


uri = 'mongodb://localhost:27017'
cli = MongoClient(uri)
db = cli['rei']

loaded_model = pickle.load(open('NearestNeighbors.pkl', 'rb'))

in_cart = db.cart.find()

res = loaded_model.kneighbors(in_cart,return_distance=False)
db.recommended.delete_many({})
db.recommended.insert_many(res)