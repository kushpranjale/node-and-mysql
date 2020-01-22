const joi = require('@hapi/joi');

function validator(message) {
    let Schema = joi.object().keys({
        'name' : joi.string().required(),
        'quantity': joi.number().required(),
        'price' : joi.number().required()
    })
    return Schema.validate(message)
}

module.exports = validator;