const { Test } = require('../models/index')


class TestController {
    static async allTest(req, res, next) {
        try {
            const tests = await Test.findAll()
            res.status(200).json(tests)
        }
        catch(err) {
            next(err)
        }
    }

    static async addTest(req, res, next) {
        console.log('masuk test')
        try {
            
            const { answer, answers, question, type } = req.body
            const newTest = await Test.create({
                answer, answers, question, type
            })
            console.log(newTest)
            res.status(201).json(newTest)
        }
        catch(err) {
            console.log(err, 'sayur sayur')
            next(err)
        }
    }

    static async editTest(req, res, next) {
        try {
          const { answer, answers, question, type } = req.body;
          const testUpdated = await Test.update({
            answer, answers, question, type}, {
                  where: {
                      id: req.params.id}, returning: true});
          res.status(200).json(testUpdated[1]);
        } catch(err) {
          next(err);
        }
      }

    static async deleteTest(req, res, next) {
        try {
            const destroyed = await Test.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: 'deleted success'
            })
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = TestController