const mongoose=require('mongoose');

// Task Schema
const taskSchema= mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Title must contains atleast 3 characters"],
        maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: true,
        maxLength: [100, "Description cannot exceed 100 characters"],
      },
      priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true,
      },
      status:{
        type: Boolean,
        default: false,
      },
      userID: String,
    username: String
},
{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
  )


// Task Model
const TaskModel=mongoose.model('Task',taskSchema);

module.exports={
    TaskModel
}