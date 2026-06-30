//SERVER_NAME="Servidor de envio y procesamiento de datos"
//SERVER_VERSION="1.0.0"
//SERVER_DESCRIPTION="Servidor para recibir y enviar datos"
//SERVER_PORT=4000

//Este es el .env que se encuetra dentro de backend. 

//Comandos usados para crear: 
    //npm install express
    //npm install dotenv
    //npm install cors
    //npm install -D nodemon

    //npm install morgan

        //Correr: 
            //npm start


    //.gitignore
        //node_modules/
        //.env


//Configuracion BD. (docker-compose.yaml)

//services:
//  mysql:
//    image: mysql:8.0
//    container_name: mysql_appnode
//    restart: always
//    environment:
//      MYSQL_ROOT_PASSWORD: root
//     MYSQL_DATABASE: appnode
//    ports:
//      - "3306:3306"
//    volumes:
//      - mysql_appnode_data:/var/lib/mysql

//  phpmyadmin:
//    image: phpmyadmin/phpmyadmin
//    container_name: phpmyadmin_appnode
//    restart: always
//    environment:
//      PMA_HOST: mysql
//      PMA_PORT: 3306
//    ports:
//      - "8080:80"
//    depends_on:
//      - mysql

//volumes:
//  mysql_appnode_data:

import dotenv from "dotenv"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)"
import express from "express";
import cors from "cors";

import parqueoRoutes from "./routes/parqueo.routes.js"; //Se utiliza para llamar "parqueoRoutes" desde el app.useS
import usuarioRoutes from "./routes/usuario.routes.js";

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

app.use("/api/parqueo", parqueoRoutes); //Esto permite llamar la funcion de parqueoCotroller

app.use("/api/usuarios", usuarioRoutes); //Se utiliza la ruta de la API para acceder a las rutas de la API, se llama a la función usuarioRoutes que se encuentra en el archivo usuario.routes.js, para que el front-end pueda acceder a las rutas de la API
//Para postman {"nombre": "Juan Pérez","correo": "juan.perez@example.com","contrasena": "Password123","confirmacion": "Password123"}

//PARA POSTMAN {"placa": "123","tipo": "carro", "horas":3, "minutos":6}

app.listen(PORT, () => {
    console.log(`${NAME} ejecutandose en http://localhost:${PORT}`);
}); //Aqui es donde se escucha el puerto