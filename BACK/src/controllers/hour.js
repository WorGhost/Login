import Hour from '../models/hour.js'

export const createHour = async (req, res) => {

    const {title, description, date} = req.body

    const newhour = new hour({
        title,
        description,
        date,
        user : req.user.id
    })

    await newhour.save()

    res.json(newhour)

}

export const getHours = async (req ,res) => {
    const hours = await Hour.find({
        user : req.user.id
    })

    res.json(hours)
}

export const getHour = async (req ,res) => {
    const hour = await Hour.findById(req.params.id)
 
    if (!hour) return res.status(404).json({
        message : "hour not found"
    })

    res.json(hour)
}

export const editHours = async (req ,res) => {

    const hour = await Hour.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    })
 
    if (!hour) return res.status(404).json({
        message : "hour not found"
    })

    res.json(hour)

}

export const deleteHours = async (req ,res) => {
    const hour = await Hour.findByIdAndDelete(req.params.id)
 
    if (!hour) return res.status(404).json({
        message : "hour not found"
    })

    return res.status(204)
}