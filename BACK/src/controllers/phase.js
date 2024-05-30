import Phase from "../models/phases.js";
import Project from "../models/project.js";

export const createPhase = async (req, res) => {
  try {
    const { name, date, user, hour } = req.body
    const id = req.params.idProject;
    const phase = new Phase({ name, date, user, hour });
    const newPhase = await phase.save();
    console.log(id)

     const updatedProject = await Project.findByIdAndUpdate(
       id,
        {$push: { phase: phase._id }},
        {new: true},
     );
     console.log(updatedProject)

    res.status(201).send(newPhase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "error al crear la fase" });
  }
};
