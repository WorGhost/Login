import Proyect from "../models/proyect.js";

export const createProyect = async (req, res) => {

    const { name, client, manager, user, phase } = req.body;

    try {

        const proyectFound = await Proyect.findOne({name, client})

        if (proyectFound) return res.status(400).json({
            message : "Proyect already exist"
        })

        const newProyect = new Proyect({ name, client, manager, user, phase })

        const proyectSaved = await newProyect.save();

        res.json(proyectSaved)
    } catch (err) { 
        res.status(500).json({ messaje: e.message });
    }

}