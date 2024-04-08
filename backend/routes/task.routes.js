const { TaskModel } = require("../models/task.model")
const { auth } = require("../middleware/auth.middleware")
const express = require("express")

const taskRouter = express.Router();



taskRouter.post("/add", auth,  async (req, res) => {
    try {

        const tasks = new TaskModel(req.body)
        await tasks.save()
        res.status(200).json({ "msg": "tasks added", "post": req.body })

    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

// auth {userID:req.body.userID}
taskRouter.get("/",auth, async (req, res) => {
    try {
            const tasks = await TaskModel.find({userID:req.body.userID})
            res.status(200).json(tasks)

    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

taskRouter.patch("/update/:taskID", auth, async (req, res) => {
    const { taskID } = req.params
    try {
        const task=await TaskModel.findOne({_id:taskID})
        if(req.body.userID===task.userID){
            await TaskModel.findByIdAndUpdate({ _id: taskID }, req.body)
            res.status(200).json(req.body)
        }else{
            res.status(400).send({"msg":"You are not authorized"})
        }
        
    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

taskRouter.patch("/toggleStatus/:taskID", auth, async (req, res) => {
    const { taskID } = req.params;
    try {
        const task = await TaskModel.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ "msg": "Task not found" });
        }

        if (req.body.userID !== task.userID) {
            return res.status(401).json({ "msg": "You are not authorized to update this task" });
        }

        // Toggle the status
        task.status = !task.status;
        await task.save();

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

taskRouter.delete("/delete/:taskID", auth, async (req, res) => {
    const { taskID } = req.params
    try {
        await TaskModel.findByIdAndDelete({ _id: taskID })
         res.status(200).send({"message":"task deleted"})
    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

module.exports = {
    taskRouter
}