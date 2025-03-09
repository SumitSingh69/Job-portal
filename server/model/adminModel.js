import mongoose from 'mongoose'
import {Schema , model} from 'mongoose';
import bcrypt from 'bcrypt';


const AdminSchema = new Schema ({
    username:{
        type:String,
        required:true
    },
    password:{
    type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
         enum:["Admin"]
    }
})
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

AdminSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

  const AdminModel = model('Admin', AdminSchema);
  export default AdminModel;
  