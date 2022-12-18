import express from "express";
import cors from "cors";
import router from './src/routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Welcome to Omnicom fifa api");
});

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});