import { Router } from "express"; //Importacion de la librería express para crear rutas en el servidor
import { agregarUsuario, eliminarUsuario, modificarUsuario, obtenerUsuarioPorId, obtenerUsuarios, loginUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/agregar", agregarUsuario); //Se crea la ruta POST para agregar usuarios, se llama a la función agregarUsuario del controlador usuario.controller.js

router.get("/", obtenerUsuarios);

router.get("/:id", obtenerUsuarioPorId);

router.put("/:id", modificarUsuario);

router.delete("/:id", eliminarUsuario);

router.post("/login", loginUsuario);

export default router;