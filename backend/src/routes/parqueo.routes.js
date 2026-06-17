import {Router} from "express"; //Esto se hace aqui por que se usaran rutas y porque no estamos usando express. 

import { calcularCobro } from "../controllers/parqueo.controller.js"; //Se importa la funcion. 

const router = Router(); //Funcion de router

router.post("/calcular", calcularCobro); //Ruta para llamar desde el app.js

export default router;