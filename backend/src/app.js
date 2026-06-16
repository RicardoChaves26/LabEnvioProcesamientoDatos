import dotenv from "dotenv"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)"
import express from "express";

dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;

const app = express();

app.get("/", (req, res) => {
    res.send(
        `<h1>${NAME}</h1> <p>${VERSION}</p><p>${DESCRIPTION}</p>`
    )
});

app.listen(PORT, () => {
    console.log(`$${process.env.NAME} ejecutandose en http://localhost:${PORT}`);
});