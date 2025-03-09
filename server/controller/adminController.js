import AdminModel from '../model/adminModel';
import isAdmin from '../middleware/auth.js'

export const createAdmin =[isAdmin , async(req , res , next )=>{
    try{
       const {username  , password, email, role} = req.body;

       const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
        const Admin = new AdminModel({
            username ,
             password ,
             email,
             role
    })
        await Admin.save()
        if(!Admin){
             return res.status(400).json({
                message:"Admin can't be created "
             })
        }
        const adminresponse ={
            id:Admin._id
        }
        res.status(200).json({
            message:" Admin created successfully " ,adminresponse
       })
    }catch(error){
        res.status(500).json({
            message:"Server crashed ",
            error:error.message
        })
    }
}]

export const Adminlogin = async (req , res, next) =>{
    try{
       const {email , password} = req.body;
       const existingAdmin = await AdminModel.findOne({email});
        if(!existingAdmin){
            return res.status(404).json({
                message:"Admin not found"
            })
        }
        if(!existingAdmin.isValidPassword(password)){
            return res.status(401).json({
                message:"Invalid password"
            })
        }Admin_id = existingAdmin._id
        const adminresponse ={
            id:Admin_id
        }
        res.status(200).json({
            message:"Admin logged in successfully" ,adminresponse
       })
        next();
    }catch(error){
        res.status(500).json({
            messatge:"Server crashed ",
            error:error.message
        })
    }
}

export const updateAdmin = [isAdmin , async(req , res , next)=>{
    try{
            const {id ,AdminData} = req.body;
            if(!id){
            res.status(404).json({
                message:"Id is invalid"
            })
            }
        const Admin = await AdminModel.findByIdandUpdate(id,AdminData )          
        if(!Admin){
            res.status(404).json({
                message:"Admin not found"
            })
        }
        res.status(200).json({
            message:"Admin updated successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Server crashed ",
            error:error.message
        })
    }
}]
export const deleteAdmin = [isAdmin , async(req , res , next)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message:"Invalid admin ID"
            })
        }
        const deletedAdmin = await AdminModel.findByIdAndDelete(id)
        if(!deletedAdmin){
            return res.status(404).json({
                message:"Admin not found"
            })
        }
        res.status(200).json({
            message:"Admin deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Server crashed ",
            error:error.message
        })
    }
}]