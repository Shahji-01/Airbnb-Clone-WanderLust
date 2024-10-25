// joi is used for sever side schema for validation

const Joi = require('joi');

module.exports.listSchema = Joi.object({
    list: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        image: Joi.string().allow("", null)
    }
    ).required(),
});

module.exports.ReviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }
    ).required(),
});

