const customers = require('./customers.api');
const providers = require('./providers.api');
const addresses = require('./address.api');
const groups = require('./groups.api');
const activities = require('./activities.api');

module.exports = {
    customers,
    providers,
    addresses,
    groups,
    activities
};