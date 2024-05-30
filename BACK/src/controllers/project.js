import Project from "../models/project.js";
import User from "../models/user.js";

export const createProject = async (req, res) => {
  const user = req.user;
  const userFind = await User.findById({ _id: user.id });
  const isAdmin = userFind.isAdmin;
  if (isAdmin) {
    return res
      .status(404)
      .send({ error: "No tiene los permisos necesarios para crear proyectos" });
  }

  try {
    const { name, client, manager, user, phase } = req.body;
    const projectFound = await Project.findOne({ name, client });

    if (projectFound)
      return res.status(400).json({
        message: "Project already exist",
      });

    const newProject = new Project({ name, client, manager, user, phase });

    const projectSaved = await newProject.save();

    res.json(projectSaved);
  } catch (err) {
    res.status(500).json({ messaje: err.message });
  }
};

export const viewProjects = async (req, res) => {
  try {
    const user = req.user;
    const userFind = await User.findById({ _id: user.id });
    const projects = await Project.find({ user: userFind });
    res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: " Error al obtener los projectos" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id });

    if (!project) {
      return res.status(404).send({ error: "projecto no encontrado" });
    }

    res.send("Se elimino el proyecto ", project);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al eliminar el projecto" });
  }
};

export const editProject = async (req, res) => {
  const user = req.user;
  const userFind = await User.findById({ _id: user.id });
  const isAdmin = userFind.isAdmin;

  if (!isAdmin) {
    return res
      .status(404)
      .send({ error: "No tiene los permisos necesarios para crear proyectos" });
  }

  const id = req.params.projectId;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "client", "manager", "user"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ err: "Aqui esta el error" });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!project) {
      return res.status(400).send({ err: "Actualización no valida" });
    }

    updates.forEach((update) => (project[update] = req.body[update]));
    await project.save();
    res.send(project);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: " error al editar el projecto" });
  }
};

// export const addUserInProject = async (req, res) => {
//   try {

//     if (!isAdmin) {
//         return res
//           .status(404)
//           .send({ error: "No tiene los permisos necesarios para crear proyectos" });
//       }

//     const isAdmin = req.user.isAdmin;
//     const projectId = req.params.id;
//     const project = await Project.findById(projectId);

//     if (project.manager !== req.user._id || !isAdmin) {
//       return res
//         .status(401)
//         .send({ error: "No está autorizado para realizar esta acción" });
//     }

//     const newUserId = req.body.userId;

//     if (project.user.includes(newUserId)) {
//       return res
//         .status(401)
//         .send({ error: "El usuario ya esta asociado a este projecto" });
//     }

//     project.user.push(newUserId);

//     await project(save);

//     res.status(200).send(project);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err: "Error al agregar usuario al projecto" });
//   }
// };
