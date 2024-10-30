const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'contacts';
const API_RESOURCE = 'customers';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the customer by ID
async function get(id) {
    try {
        if(!id) {
            throw ({
                message: "Customer ID is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}${API_SERVICE}/${API_RESOURCE}/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw ({
                message: "Customer not found",
                status: 404,
                code: "not_found"
            });
        }

        const customer = response.data;

        return customer;
    } catch (error) {
        throw ({
            message: error.message || "Error getting customer",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to get the customers
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
                message: "Customers not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    } catch (error) {
        throw ({
            message: error.message || "Error listing customer",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to create a customer
async function add(customer) {
    try {
        if(!customer) {
            throw ({
                message: "Customer data is required",
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
            data: customer
        });

        if(!response.data) {
            throw ({
                message: "Error creating customer",
                status: 500,
                code: "internal_server_error"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error creating customer",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to update a customer
async function update(customer) {
    try {
        if(!customer) {
            throw ({
                message: "Customer data is required",
                status: 400,
                code: "bad_request"
            });
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}/${customer.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: customer
        });

        if(!response.data) {
            throw ({
                message: "Error updating customer",
                status: 500,
                code: "internal_server_error"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error updating customer",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

// Implement a function to delete a customer
async function remove(id) {
    try {
        if(!id) {
            throw ({
                message: "Customer ID is required",
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
                message: "Customer not found",
                status: 404,
                code: "not_found"
            });
        }

        return response.data;
    }
    catch (error) {
        throw ({
            message: error.message || "Error deleting customer",
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