const Category = require('models/Category');

const post = async (req, res) => {
    const body = JSON.parse(req.body);

    const category = await Category.create(body);
    res.body = JSON.stringify(category.get());
    return res;
};

const get_by_id = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    res.body = JSON.stringify(category.get());
    return res;
};

module.exports = {
    post,
    get_by_id
}