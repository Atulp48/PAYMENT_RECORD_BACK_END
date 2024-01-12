import Task from "../models/Task.js";

export const newTsk = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // const task=new Task({title});
        // await task.save()

        await Task.create({
            title,
            description,
            User: req.user
        })

        res.status(201).json({
            success: true,
            message: "success for adding "
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export const fndTsk = async (req, res, next) => {
    try {

        const tsk = await Task.find({ User: req.user._id });
        res.status(201).json({
            success: true,
            tsk
        })

    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}
export const dlttTsk = async (req, res, next) => {

    try {
        const { id } = req.params;
        const tsk = await Task.findById(id);

        await tsk.deleteOne();
        res.status(201).json({
            success: true,
            message: "delete ho gaya"
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}
export const updtTsk = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tsk = await Task.findById(id);
        tsk.isCompleted = !tsk.isCompleted;

        await tsk.save();

        res.status(201).json({
            success: true,
            message: "update ho gaya"
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

