// Create and export a new instance of NodeCache to save the oauth2 token in memory

const NodeCache = require("node-cache");

module.exports = new NodeCache();