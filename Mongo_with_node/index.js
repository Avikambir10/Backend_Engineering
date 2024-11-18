import express from 'express';
const app = express();
const port = 3000;
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let db;
app.use(express.json());

async function main() {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    db = client.db('university');
    return 'done';
}

function getDB() {
    if (db !== undefined) return db;
    return null;
}

// POST: Add a new student
app.post("/students", async (req, res) => {
    try {
        const { name, age, marks } = req.body;
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const students = db.collection("students");
        const result = await students.insertOne({ name, age, marks });
        res.json({ message: "Data added successfully", data: result.ops[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Retrieve all students
app.get("/students", async (req, res) => {
    try {
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const students = db.collection("students");
        const result = await students.find().toArray();
        res.json({ data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Retrieve a specific student by ID
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const students = db.collection("students");
        const result = await students.findOne({ _id: new ObjectId(id) });
        if (!result) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update a student by ID
app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, marks } = req.body;
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const students = db.collection("students");
        const result = await students.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, age, marks } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Remove a student by ID
app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const students = db.collection("students");
        const result = await students.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

main()
    .then(() => {
        app.listen(port, (err) => {
            if (err) {
                console.log("Error connecting to server");
            } else {
                console.log(`Server connected at PORT: ${port}`);
                console.log(`http://localhost:${port}`);
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.send("Welcome to the Student Management API");
});
