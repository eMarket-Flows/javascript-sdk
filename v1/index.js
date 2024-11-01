const contacts = require('./contacts-service/index');
const billing = require('./billing-service/index');
const notifications = require('./notifications-service/index');
const oauth2 = require('./oauth2-service/index');
const inventory = require('./inventory-service/index');
const ubications = require('./ubications-service/index');
const ecommerce = require('./ecommerce-service/index');

module.exports = {
    contacts,
    billing,
    notifications,
    oauth2,
    inventory,
    ubications,
    ecommerce
};