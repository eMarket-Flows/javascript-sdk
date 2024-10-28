const contacts = require('./api/contacts-service');
const oauth2 = require('./api/oauth2-service');
const billing = require('./api/billing-service');
const notifications = require('./api/notifications-service');
const inventory = require('./api/inventory-service');

const MicroServices = {
    billing,
    contacts,
    inventory,
    notifications,
    oauth2
};

module.exports = MicroServices;