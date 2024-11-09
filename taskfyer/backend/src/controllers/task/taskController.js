import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!description || description.trim() === "") {
        return res.status(400).json({ message: "Description is required" });
    }

    try {
        const task = new TaskModel({
            title,
            description,
            dueDate,
            priority,
            status,
            user: req.user._id,
        });
            //save the task

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// get tasks

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

      if(!userId){
        res.status(404),json({ message:"User not found"});
      }

        const tasks = await TaskModel.find({ user: userId });

        res.status(200).json({
            length: tasks.length,
            tasks,
        });
        
        

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


//
export const getTask = asyncHandler(async (req, res)=>{
    try {
        const userId = req.user._id;

        const{ id } = req.params;
        
        if(!id){
            res.status(404).json({ message:"please provide a task id" });

        }

        const task = await TaskModel.findById(id).populate("user", "name email");

        if(!task){
            return res.status(404).json({ message:"Task not found" });
        }

        if(!task.user.equals(userId)){
            return res.status(403).json({ message:"You are not authorized to view this task" });
        }

        res.status(200).json(task);
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }
});


// update task
export const updateTask = asyncHandler(async(req,res) => {
    try {
        const userId = req.user._id;

        const { id } = req.params;
        const {title, description, dueDate,priority,status,completed }=req.body;

        if(!id){
            res.status(404).json({ message:"please provide a task id" });
        }
        
        const task = await TaskModel.findById(id);
        if(!task){
            return res.status(404).json({ message:"Task not found" });
        }

        //check if the user is the owner of the task
        if(!task.user.equals(userId)){
            return res.status(403).json({ message:"You are not authorized to update this task" });
        }

        //update the task with the new data if provided or keep the old data
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed || task.completed;
        
        await task.save();
    
        res.status(200).json(task);

    } catch (error) {
        //error
        res.status(500).json({ message: "Server error", error: error.message });

    }
});

//delete tasks

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const { id } = req.params;

        const task = await TaskModel.findById(id);
        if (!task){
            return res.status(404).json({ message: "Task not found" });
        }
       
        //check if the user is the owner of the task
        if (!task.user.equals(userId)){
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }

        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
        
        
         } catch (error) {
        res.status(500).json({ message: "delete failed" });
    }
});
