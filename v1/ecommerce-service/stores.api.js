const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'ecommerces';
const API_RESOURCE = 'stores';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the push notification by ID
async function get(id) {
    try {
        if(!id) {
            throw ({
                message: 'Ecommerce store ID is required',
                status: 400,
                code: 'ecommerce_store_id_required'
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
                message: 'Ecommerce store not found',
                status: 404,
                code: 'ecommerce_store_not_found'
            })
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the ecommerce stores
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
            throw new Error('Ecommerce store not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to add a ecommerce store
async function add(push) {
    try {
        if(!push) {
            throw new Error('Ecommerce store is required');
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
            data: push
        });

        if(!response.data) {
            throw new Error('Ecommerce store not added');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a Ecommerce store
async function update(push) {
    if(!push) {
        throw new Error('Ecommerce store is required');
    }

    const token = await getTokenFromCache();
            
    const response = await axios.request({
        method: 'PUT',
        url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}`,
        headers: { 
            'content-type': 'application/json',
            'authorization': `Bearer ${token.access_token}`,
            'cache-control': 'no-cache'
        },
        data: push
    });

    if(!response.data) {
        throw new Error('Ecommerce store not updated');
    }

    return response.data;
}

// Implement a function to delete a Ecommerce store
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Ecommerce store ID is required');
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
            throw new Error('Ecommerce store not deleted');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    get,
    list,
    add,
    update,
    remove
};