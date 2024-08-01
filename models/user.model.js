import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
},
{
    timestamps: true
})

UserSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 10);
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password){
    return await bcryptjs.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// UserSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id,
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export const User = mongoose.model("User", UserSchema)