from pymongo import MongoClient
import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors
import flask as fl

uri = 'mongodb://localhost:27017'
cli = MongoClient(uri)
db = cli['rei']

app = fl.Flask(__name__)
@app.route('/api/recs', methods=['POST'])

def recs():
    
    loaded_model = pickle.load(open('NearestNeighbors.pkl', 'rb'))

    #in_cart = db.cart.find()
    in_cart = fl.request.get_json(force=True)

     # Ensure the data is a list (even if it's just one dictionary)
    if isinstance(data, dict):
        data = [data]

    res = loaded_model.kneighbors(in_cart,return_distance=False)
    db.recommended.delete_many({})
    db.recommended.insert_many(res)

if __name__ == '__main__':
    app.run(port=5000)