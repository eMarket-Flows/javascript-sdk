/**
 * @file cache.js
 * @description This module initializes and exports an instance of NodeCache.
 * @requires node-cache
 */

const NodeCache = require("node-cache");

module.exports = new NodeCache();