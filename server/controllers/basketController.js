const {Basket, Product, BasketProduct} = require("../models/models");

class BasketController {
    async add(req, res) {
        const {id} = req.params;
        const product = await BasketProduct.create({productId: id})

        return res.json(product)
    }

    async remove(req, res) {
        const {id} = req.params;
        const product = await BasketProduct.destroy({where: {productId: id}})

        return res.json(product)
    }
    async getAll(req, res) {
        const basketIds = await BasketProduct.findAll()
        const products = await Product.findAll({where: {id:basketIds.map(el => el.productId)}})
        return res.json(products)
    }
}

module.exports = new BasketController()