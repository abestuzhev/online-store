const {Product, Favorites} = require("../models/models");

class FavoritesController {
    async add(req, res) {
        const {id} = req.params;
        const product = await Favorites.create({productId: id})
        if(product) {
            await Product.update({productId: id}, {where: {isFavorite: true}})
        }

        return res.json(product)
    }

    async remove(req, res) {
        const {id} = req.params;
        const product = await Favorites.destroy({where: {productId: id}})
        await Product.update({productId: id}, {where: {isFavorite: false}})

        return res.json(product)
    }

    async getAll(req, res) {
        const favoriteIds = await Favorites.findAll()
        const products = await Product.findAll({where: {id:favoriteIds.map(el => el.productId)}})
        return res.json(products)
    }
}

module.exports = new FavoritesController()