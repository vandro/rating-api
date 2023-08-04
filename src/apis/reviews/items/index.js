const { route } = require('@chuva.io/less');
const controller = require('controllers/items');
module.exports = {
    post: route(controller.post, [])
}
