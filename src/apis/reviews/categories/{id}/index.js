const { route } = require('@chuva.io/less');
const controller = require('controllers/categories');
module.exports = {
    get: route(controller.get_by_id, [])
}