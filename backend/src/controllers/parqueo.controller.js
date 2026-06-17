export function calcularCobro(req, res){
        
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
}