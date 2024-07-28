import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {

    // get the data from frontend
    const { email, password, fullName } = req.body;

    // validate the data
    if ([email, password, fullName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if the user already exists
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // create the user
    const user = await User.create({
        email,
        password,
        fullName
    })

    const createdUser = await User.findById(user._id).select("-password");
    console.log(createdUser);


    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json({
        message: "User registered successfully",
        user: createdUser
    })
})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPassCorrect = await user.isPasswordCorrect(password);

    if (!isPassCorrect) {
        throw new ApiError(401, "Wrong password");
    }

    // const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            message: "User logged in successfully",
            user: loggedInUser, accessToken
        })

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                accessToken: undefined
            }
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res.clearCookie("accessToken")
    res.status(200).json({
        message: "User logged out successfully"
    })
})

export {
    registerUser,
    loginUser,
    logoutUser
}