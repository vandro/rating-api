const Category = require('models/Category');

const post = async (req, res) => {
    const body = req.body;

    const category = await Category.create(body);
    res.body = category;
    return res;
};

module.exports = {
    post
}