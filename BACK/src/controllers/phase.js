import Phase from "../models/phases.js";
import Project from "../models/project.js";
import User from "../models/user.js";

export const createPhase = async (req, res) => {
  try {
    const { name, date, user, hour } = req.body;
    const id = req.params.idProject;
    const users = req.user;
    const userFind = await User.findById({ _id: users.id });
    const isAdmin = userFind.isAdmin;
    const project = await Project.findById({ _id: id });

    if (!isAdmin || project.manager.toString() == users.id) {
      return res
        .status(401)
        .send({ error: "No está autorizado para realizar esta acción" });
    }

    const phase = new Phase({ name, date, user, hour });
    phase.project = id;
    const newPhase = await phase.save();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $push: { phase: phase._id } },
      { new: true }
    );

    res.status(201).send(newPhase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "error al crear la fase" });
  }
};

export const viewPhase = async (req, res) => {
  try {
    const id = req.params.idProject;
    const phase = await Phase.find({ project: id });

    res.status(200).send(phase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: " Error al obtener las fases" });
  }
};

export const deletePhase = async (req, res) => {
  try {
    const id = req.params.idPhase;
    const phase = await Phase.findOneAndDelete({ _id: id });
    res.status(200).send(phase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: " Error al eliminar la fase" });
  }
};

export const editPhase = async (req, res) => {
  try {
    const id = req.params.idPhase;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "user"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ err: "Aqui esta el error" });
    }

    const phase = await Phase.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    console.log(phase);
    res.status(200).send(phase);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: " Error al editar la fase" });
  }
};
