const User = require('../models/User');
const bcrypt = require("bcrypt");
module.exports = {
    register :async (req, res, next) =>{
         try {
            const { username , email ,password } = req.body;
            
            const user =await User.findOne({ username : username })
            if (user) { 
               return res.status(400).json({
                    message : 'username already used',
                    status : false
                })
            }
            const checkmail = await User.findOne({ email : email })
            if (checkmail) { 
                return res.status(400).json({
                     message : 'email already used',
                        status : false
                 })
             }
                const hashpassword = await bcrypt.hash(password, 12);
                const newUser = await User.create({
                    username : username,
                    password : hashpassword,
                    email :email    

                })
                delete newUser.password;
                return res.status(200).json({
                     user : newUser,
                     status : true
                });
            
            
         } catch (error) {
                res.status(500).json({message: error.message , status: false});
         }

    },
    login :async (req, res) => {
        try {
            const { username, password } = req.body ;
            const user = await User.findOne({username: username});
            if (!user) {
                return res.status(404).json({message:"User not found",status : false});
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) {
                return res.status(404).json({message:"Password incconrect !",status : false});
            }
            const userObject = user.toObject();
            delete userObject.password;
            return res.status(200).json({
                   status : true,
                   user : userObject
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    setAvatar : async (req, res) => {
        try {
            const id = req.params.id;
            const image = req.body.image;
            const user = await User.findByIdAndUpdate(id,{
                isAvatarImageSet : true,
                avatarImage : image

            });
           
            return res.status(200).json({
                   isSet : user.isAvatarImageSet,
                   image : user.avatarImage
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getAllUser : async (req, res) => {
        try {
            const users = await User.find({ _id :{$ne :req.params.id }})
                .select(["email", "username", "avatarImage", "_id"]);
            return res.json(users);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    logout :(req, res) =>{
        try {
            if (!req.params.id) return res.json({ msg: "User id is required " });
           // onlineUsers.delete(req.params.id);
            return res.status(200).send();
          } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}