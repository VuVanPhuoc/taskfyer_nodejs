import mongoose from "mongoose";

// Import environment variables
  const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "please provide a title"],
      unique: true,
    },
    description: {
      type: String,
      default: "No description",
    },
    
    dueDate: {
        type: Date,
        default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "inactive"],
      default: "Active",
    },
    
    completed: {
        type: Boolean,
        default: false,
    },
    
    prority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  }, 
{timestamps: true}
);  


const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;