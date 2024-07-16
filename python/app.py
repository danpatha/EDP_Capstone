from pymongo import MongoClient;
import pandas as pd;
import pickle;
from sklearn.neighbors import NearestNeighbors;




uri = 'mongodb://localhost:27017'
cli = MongoClient(uri)
db = cli['rei']

##app = fl.Flask(__name__)
#@app.route('/api/recs', methods=['POST'])
#def recs():
    
loaded_model = pickle.load(open(r'C:/bootcamp capstone/EDP_Capstone/python/NearestNeighbors.pkl', 'rb'))
in_cart = db.cart.find()
# in_cart = fl.request.get_json(force=True)
#print(in_cart)

    # Ensure the data is a list (even if it's just one dictionary)
in_cart = pd.DataFrame.from_dict(in_cart)
index = in_cart['_id'][0]
df = pd.read_csv(r'C:/bootcamp capstone/EDP_Capstone/python/store_products.csv')
mass = pd.get_dummies(df)
in_cart = mass.loc[df["_id"] == index]

res = loaded_model.kneighbors(in_cart,return_distance=False)
out = df.loc[df['_id'].isin( res[0])]
print(out)
db.recommended.delete_many({})
db.recommended.insert_many(out.to_dict(orient="records"))
db.cart.delete_many({})

# if __name__ == '__main__':
#     app.run(port=5000)