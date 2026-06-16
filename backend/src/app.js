import dotenv from "dotenv"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)"
import express from "express";
import cors from "cors";

dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: NAME,
        version: VERSION, 
        description: DESCRIPTION,
        puerto: PORT
    })
});

app.listen(PORT, () => {
    console.log(`${NAME} ejecutandose en http://localhost:${PORT}`);
});