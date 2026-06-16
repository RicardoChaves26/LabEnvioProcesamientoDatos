import dotenv from "dotenv"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)"
import express from "express";
import cors from "cors";

dotenv.config();

const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;
const app = express();

app.use(cors());  //Permite que otros origenes accedan al API
app.use(express.json()); //Permite que el frontend envie datos en formato JSON

app.get("/", (req, res) => {
    res.json({ //Devuelve un objeto JSON para que el frontend lo pueda leer. 
        name: NAME,
        version: VERSION, 
        description: DESCRIPTION,
        puerto: PORT
    })
});

app.post("/api/parqueo/calcular", (req, res) => { //Ruta para agregar datos
    
    const {placa, tipo, horas, minutos} = req.body; //Esto es destructuracion del objeto json. 
    
    if (!placa || placa.trim()=="") { //No permite enviar sin la placa ni tampoco sin campos en blanco.
        res.status(400).json({error: "La placa es obligatoria"}) //Devuelve un error
    } //Validacion sobre si la placa es requerida

    if (!tipo || (tipo!=="carro" && tipo!=="moto")) { //El vehiculo debe ser moto o carro
        res.status(400).json({error: "El vehiculo es requerido y solo puede ser moto y carro"})
    }

    if (Number.isNaN(horas) || horas < 0) { //Solo permite pasar numeros y no permite pasar horas menores a 0
        res.status(400).json({error: "La cantidad de hora no es valida"})
    }

    if (Number.isNaN(minutos) || minutos < 0 || minutos > 59 ) { //Solo permite numeros y los minutos no pueden ser menores de 0 ni mayores de 59.
        res.status(400).json({error: "Los minutos son requeridos"})
    }

    const tarifa=tipo==="carro"? 1200 : 500; //Esto nos permite ver si el tipo es carro cobra 1200 en caso de no ser entonces 500

    let h=Number(horas); //Convierte de horas a numeros
    let m=Number(minutos); ////Convierte de minutos a numeros

    if (m>5) h++; //En caso de aver mas de 5 en minutos entonces se le suma una hora. 

    const total = h*tarifa; //Se calcula el total de la tarifa

    res.json({
        placa: placa,
        tipo: tipo,
        tarifa: tarifa,
        tiempo: horas+":"+minutos,
        horasCobradas: h,
        total: total
    }) //Guarda el objeto en el archivo json.
});

//PARA POSTMAN {"placa": "123","tipo": "carro", "horas":3, "minutos":6}

app.listen(PORT, () => {
    console.log(`${NAME} ejecutandose en http://localhost:${PORT}`);
}); //Aqui es donde se escucha el puerto