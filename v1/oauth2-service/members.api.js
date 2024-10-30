const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'oauth2';
const API_RESOURCE = 'organizations/members';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the organization by ID
async function get(id) {
    try {
        var token = await getTokenFromCache();
                
        var response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw ({
                message: "Organization not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error getting organization",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to get the organization
async function list(filters) {
    try {
        var token = await getTokenFromCache();

        // Convert filters to query string
        var queryString = '';
        if(filters) {
            queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
        }
                
        var response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}?${queryString}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw ({
                message: "Organizations not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error getting organizations",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to add a organization
async function add(organization) {
    try {
        var token = await getTokenFromCache();
                
        var response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: organization
        });

        if(!response.data) {
            throw ({
                message: "Organization not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error creating organization",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to update a organization
async function update(organization) {
    try {
        var token = await getTokenFromCache();
                
        var response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: organization
        });

        if(!response.data) {
            throw ({
                message: "Organization not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error updating organization",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to delete a organization
async function remove(id) {
    try {
        var token = await getTokenFromCache();
                
        var response = await axios.request({
            method: 'DELETE',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw ({
                message: "Organization not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error deleting organization",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

module.exports = {
    get,
    list,
    add,
    update,
    remove
};