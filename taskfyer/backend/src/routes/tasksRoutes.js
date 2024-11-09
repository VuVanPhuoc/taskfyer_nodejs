import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/task/create",protect,createTask); 

//all tasks
router.get("/tasks",protect,getTasks); 

//id task
router.get("/task/:id",protect,getTask);

// update task
router.patch("/task/:id",protect,updateTask);

//dedlet task
router.delete("/task/:id",protect,deleteTask);



export default router; 
 