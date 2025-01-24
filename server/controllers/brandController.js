const {Brand} = require("../models/models");
const ErrorService = require("../services/ErrorService");

class BrandController {
    async create(req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name})

        return res.json(brand)
    }
    async remove(req, res, next) {
        try {
            const {id} = req.params
            const brand = await Brand.destroy({where: {id}})

            return res.json(brand)
        } catch (e) {
            next(ErrorService.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const brand = await Brand.findOne({where: {id}})
        return res.json(brand)
    }
}

module.exports = new BrandController()