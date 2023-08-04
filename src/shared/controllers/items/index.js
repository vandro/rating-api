const Joi = require('joi');

const Item = require('models/Item');
const Category = require('models/Category');
const schema = require('./schema');

const dynamic_attributes_schema = (category) => {
    // Define a Joi schema to validate item attributes against category attributes
    return Joi.object().keys(
        category.attributes.reduce((acc, attribute) => {
            acc[attribute] = Joi.string().required();
            return acc;
        }, {})
    );
};

const post = async (req, res) => {
    const body = JSON.parse(req.body);

    const { error } = schema.validate(body);
    if (error) {
        throw error;
    }

    const category = await Category.findByPk(body.category_id);

    const attributes_schema = dynamic_attributes_schema(category);

    // Validate item_attributes against the attributes_schema
    const { error: attributes_error } = attributes_schema.validate(body.attributes);

    if (attributes_error) {
        console.error(`Error: ${attributes_error.message}`);
        throw new Error('Invalid item attribute');
    }

    const item = await Item.create(body);
    res.body = JSON.stringify(item.get());
    return res;
};

const get_all = async (req, res) => {
    const items = await Item.findAll();

    res.body = JSON.stringify(items.map(item => item.get()));
    return res;
};

module.exports = {
    post,
    get_all
}
