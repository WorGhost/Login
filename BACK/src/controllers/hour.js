import Hour from "../models/hour.js";
import Phase from "../models/phases.js";

export const createHour = async (req, res) => {
  const idPhase = req.params.idPhase;
  const { hours, description, date } = req.body;

  const hour = new Hour({
    hours,
    description,
    date,
    user: req.user.id,
  });

  hour.phase = idPhase;
  const newHour = await hour.save();

  const updatePhase = await Phase.findByIdAndUpdate(idPhase,
    {
      $push: { hour: hour._id }
    },
    { new: true }
  )

  res.status(200).send(newHour)
};

export const getHours = async (req, res) => {
  const id = req.params.idPhase;
  const hours = await Hour.find({
    phase : id
  });

  res.status(200).send(hours);
};

export const editHours = async (req, res) => {
  const hour = await Hour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!hour)
    return res.status(404).json({
      message: "hour not found",
    });

  res.json(hour);
};

export const deleteHours = async (req, res) => {
  const hour = await Hour.findByIdAndDelete(req.params.id);

  if (!hour)
    return res.status(404).json({
      message: "hour not found",
    });

  return res.status(204);
};
