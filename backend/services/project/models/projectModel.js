import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
},

name: {
    type:String,
    required:true
},
description:{
    type:String
},
strared:{
    type:Boolean,
    default:false,
},

lastOpendAt: {
    type:Date,
    default:Date.now
}

},{
    timestamps:true
})

const project = mongoose.model("Project",projectSchema)
export default Project