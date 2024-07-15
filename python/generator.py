import csv
import random
from datetime import datetime, timedelta
import json
import numpy as np
import pandas as pd

NUM_ROWS = 5000

# Create the CSV file
OUTPUT_FILE = "store_products.csv"

# Load home world data from JSON file
with open("brands.json") as json_file:
    brands = json.load(json_file)

# Generate data rows
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    unit_id = i
    size = random.choice(
        ["XS", "S", "M", "L", "XL", "XXL"]
    )
    categories = random.choice(['Cycling','Women Clothing','Men Clothing','Camping and Hiking', 'Water and Snow Sports', 'Accessories'])
    popularity = random.randint(1, 100)
    durability = random.randint(1, 100)
    price = random.randint(1, 2000)
    

    # Select a random home world from the available options
    brand = random.choice(brands)
    brand_name = brand["name"]

    # Create the data row
    data_row = [
        unit_id,
        size,
        categories,
        popularity,durability,
        price,
        brand_name,
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["unit_id", "Size", "Categories", "Popularity", "Durability", "Price", "brand"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
