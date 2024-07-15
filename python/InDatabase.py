from pymongo import MongoClient
import pandas as pd

uri = 'mongodb://localhost:27017'
cli = MongoClient(uri)
db = cli['rei']
collection = db['all_products']

df = pd.read_csv('store_products.csv')
df.head()

data=df.to_dict(orient="records")

collection.delete_many({})
collection.insert_many(data)
