import Phase from "../models/phases.js";
import Project from "../models/project.js";
import User from "../models/user.js";

export const createPhase = async (req, res) => {
 try {
    const { name, date, user, hour } = req.body
    const id = req.params.idProject;
    const users = req.user;
    const userFind = await User.findById({ _id: users.id });
    const isAdmin = userFind.isAdmin;
    const project = await Project.findById({ _id: id });
    
     if (!isAdmin  || project.manager.toString() == users.id ) {
       return res.status(401).send({ error: "No está autorizado para realizar esta acción" });
     }
    
    const phase = new Phase({ name, date, user, hour });
    const newPhase = await phase.save();

     const updatedProject = await Project.findByIdAndUpdate(
       id,
        {$push: { phase: phase._id }},
        {new: true},
     );

    res.status(201).send(newPhase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "error al crear la fase" });
  }
};
