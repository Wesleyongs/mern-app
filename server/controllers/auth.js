import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register USER

export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            fruends,
            location,
            occupation,
        } = req.body;
        const salt = await b.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            fruends,
            location,
            occupation,
            viewedProfile: 100
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}