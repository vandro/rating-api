const { route } = require('@chuva.io/less');
const controller = require('controllers/categories');
module.exports = {
    post: route(controller.post)
}