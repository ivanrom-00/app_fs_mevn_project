const User = require("../models/User");
const passport = require("passport");

module.exports = class API {
    static async register(req, res) {
        const { name, email, password } = req.body;

        try {
            // Registrar un nuevo usuario
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.send({ newUser });
        } catch (err) {
            //res.status(400).json({ message: 'Email already exists' });
            res.status(400).json({ message: err.message });
        }
    }

    static login = passport.authenticate("local", {
        successRedirect: "/",
    });

    static async login(req, res) {
        try {
            passport.authenticate("local", { successRedirect: "/" });
        } catch (err) {
            res.status(400).json({ message: "Error during login" });
        }
    }

    static async logout(req, res) {
        req.session.destroy();
    }
};
