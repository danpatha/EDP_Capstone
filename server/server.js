import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import {PythonShell} from 'python-shell';

dotenv.config();
const url = "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

app.get('/sports/featured/:limit', async (req, res) => {
    try {
        let {limit} = req.params;
        limit = +limit; // The + converts limit from a string to integer.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const sports = await collection.find({})
        .sort({ Popularity: -1 })  // Sort by 'Popularity' in descending order
        .limit(limit)             // Limit the results to the specified number
        .toArray();
        res.json(sports);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, there was something wrong with loading our most popular items');
    }
});

app.get('/sports/categories', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const categories = await collection.distinct("Categories");
        res.json(categories);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, there was something wrong with loading our categories");
    }
});

// app.get('/socks', async (req, res) => {
//     try {
//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const socks = await collection.find({}).toArray();
//         res.json(socks);
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Hmmm, something smells... No socks for you! ☹");
//     }
// });


app.post('/sports/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const sports = await collection.find({ 'brand': regex }).toArray();
        res.json(sports);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, and error searching for sporting goods.');
    }
});



app.post('/sports/cart', async (req, res) => {
    try {
        const product  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('cart');
        const result = await collection.insertOne(product);
        PythonShell.run('C:\\bootcamp capstone\\EDP_Capstone\\python\\app.py', null).then(messages=>{
            console.log('finished');
          });
        //res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding product');
    }
});
app.get('/sports/recs', async (req, res) => {
    try {
        const product  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('recommended');
        const result = await collection.find();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error showing products');
    }
});

app.delete('/sports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).send('Sock deleted successfully');
        } else {
            res.status(404).send('Sock not found');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.post('/sports/transactions', async (req, res) => {
    try {
        const transaction  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("transactions");
        const result = await collection.insertOne(transaction);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});


app.post('/sports', async (req, res) => {
    try {
        const sock  = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(sock);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});

app.get('/sports/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        const{category} = req.query
        limit = +limit; // The + converts limit from a string to integer.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const filter = {}
        if(category){
            filter.Categories = category
        }
        const sports = await collection.find(filter).skip((page - 1) * limit).limit(limit).toArray();
        res.json(sports);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, error fetching sports equipment.');
    }
});

// app.get('/socks/:color', async (req, res) => {
//     try {
//         const { color } = req.params;

//         const data = await fs.readFile('../data/socks.json', 'utf8');
//         const jsonObj = JSON.parse(data);
//         const result = jsonObj.filter(sock => sock.color.toUpperCase() === color.toUpperCase());
//         if(result.length === 0) {
//             return res.status(404).send("No socks found with that color.");
//         }
//         res.json(result);
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Hmmm, something smells... No socks for you! ☹");
//     }
// });

app.get('/sports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const sports = await collection.findOne({ _id: new ObjectId(id) });
        res.json(sports);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});



app.post('/user', async (req, res) => {
    try {
        // Obligatory reference to POST Malone
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            // Bad request if username or email is missing
            return res.status(400).send({ error: 'Username and email are required.' });
        }

        // Respond with the created user information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234', // This URL should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.delete('/sports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting sock with ID:', id);
        res.status(200).send('Sock deleted successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});