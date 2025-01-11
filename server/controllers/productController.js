const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo, BasketProduct} = require("../models/models");
const ErrorService = require("../services/ErrorService");

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const product = await Product.create({name, price, brandId, typeId, img: fileName})

            if(info) {
                const infoParse = JSON.parse(info)
                infoParse.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                })
            }
            return res.json(product)
        } catch (e) {
            next(ErrorService.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.destroy({where: {id}})

            return res.json(product)
        } catch (e) {
            next(ErrorService.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const {brandId, typeId, limit = 20, page = 1} = req.query
        let products = [];
        let offset = page * limit - limit

        if(!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }

        if(brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }

        if(!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }

        if(brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }

        return res.json(products)
    }
    async getOne(req, res) {
        const {id} = req.params;
        const product = await Product.findOne({
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
        })

        return res.json(product)

    }
}

module.exports = new ProductController()