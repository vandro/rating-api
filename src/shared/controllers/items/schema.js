const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.string().required(),
    attributes: Joi.object().required()
});

module.exports = schema;
