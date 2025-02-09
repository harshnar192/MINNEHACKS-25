import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the FRONTEND directory
app.use(express.static(path.join(__dirname, '../FRONTEND')));

// Serve the main HTML file
    res.send(data.products);
});

console.log(process.env.MONGO_URI);

app.listen(PORT, "0.0.0.0",()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

