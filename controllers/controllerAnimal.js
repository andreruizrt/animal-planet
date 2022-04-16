const Animal = require('../models/models_nosql/animal');

module.exports = {

    async getCreate(req, res) {
        res.render('animal/animalCreate');
    },
    async postCreate(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const animal = new Animal({ nome, nomeDoProprietario, endereco, tipo, raca });
        await animal.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Animal.find().then((animals) => {
            res.render('animal/animalList', { animals: animals.map(animals => animals.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Animal.findOne({ _id: req.params.id }).then((animals) => {
            res.render('animal/animalList', { animals: animals.toJSON() });
        });
    },
    async postEdit(req, res) {
        await Animal.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.redirect('/animalList');
    },
    async getDelete(req, res) {
        await Animal.findOneAndRemove({ _id: req.params.id });
        res.redirect('/animalList');
    }
}