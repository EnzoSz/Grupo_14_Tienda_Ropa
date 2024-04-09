const { Image } = require("../../database/models");
var path = require('path');


module.exports = {
    getAll: async (req, res) => {
        try {
            const images = await Image.findAll({
                order: [["created_at", "DESC"]],
            });

            res.status(200).json({
                status: 200,
                length: images.length,
                images,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
    },

    getImage: async (req, res) => {
        try {
          let { img } = req.params;
          res.sendFile(`${path.resolve(__dirname, `../../../public/assets/images/users/${img}`)}`)
        } catch (error) {
          console.log(error);
          res.status(400).json({ error });
        }
      }
};