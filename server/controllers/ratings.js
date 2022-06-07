const Rating = require('../models/Rating');

module.exports = class API {
    // Obtener todos los ratings
    static async getAllRatings(req, res) {
        try {
            const ratings = await Rating.find();
            res.status(200).json(ratings);
        } catch (err) {
            res.send(404).json({ message: err.message });
        }
    }

    // Añadir o actualizar un rating
    static async createUpdateRating(req, res) {
        const rating = req.body;
        Rating.findOne({ usr: rating.usr }, async (err, obj) => {
            // console.log(obj);
            if (obj != null) {
                try {
                    await Rating.findOneAndUpdate(rating.usr, rating);
                    res.status(200).json({ message: 'Rating updated succesfully' });
                } catch (err) {
                    res.send(404).json({ message: err.message });
                }
            } else {
                try {
                    await Rating.create(rating);
                    res.status(201).json({ message: 'Rating created succesfully' });
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        });
    }
}