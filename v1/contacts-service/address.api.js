const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'contacts';
const API_RESOURCE = 'addresses';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the Address by ID
async function get(id) {
    try {
        if(!id) {
            throw ({
                message: "Address ID is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
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
                message: "Address not found",
                status: 404,
                code: "not_found"
            });
        }

        const address = response.data;

        return address;
    } catch (error) {
        throw ({
            message: error.message || "Error getting address",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to get the addresses
async function list(filters) {
    try {
        const token = await getTokenFromCache();

        // Convert filters to query string
        let queryString = '';
        if(filters) {
            queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
        }
                
        const response = await axios.request({
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
                message: "Address not found",
                status: 404,
                code: "not_found"
            })
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error getting address",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to create a address
async function add(address) {
    try {
        if(!customer) {
            throw ({
                message: "Address data is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: address
        });

        if(!response.data) {
            throw ({
                message: "Address not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error creating address",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to update a address
async function update(address) {
    try {
        if(!address) {
            throw ({
                message: "Address data is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}/${address.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: address
        });

        if(!response.data) {
            throw ({
                message: "Address not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error updating address",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to delete a address
async function remove(id) {
    try {
        if(!id) {
            throw ({
                message: "Address ID is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
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
                message: "Address not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error deleting address",
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