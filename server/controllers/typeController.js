const {Type} = require('../models/models')
const ErrorService = require("../services/ErrorService");

class TypeController {
    async create(req, res) {
        const {name} = req.body;
        const type = await Type.create({name})

        return res.json(type)
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params
            const type = await Type.destroy({where: {id}})

            return res.json(type)
        } catch (e) {
            next(ErrorService.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async getOne(req, res) {
        const {id} = req.params;
        const type = await Type.findOne({where: {id}})
        return res.json(type)
    }
}

module.exports = new TypeController()