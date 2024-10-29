const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'ubications';
const API_RESOURCE = 'ubications';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the ubication by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Ubication ID is required');
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
            throw new Error('Ubication not found');
        }

        ubication = response.data;

        return ubication;
    } catch (error) {
        throw error;
    }
}

// Implement a function to get the ubications
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
            throw new Error('Ubications not found');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}

// Implement a function to create a ubication
async function add(ubication) {
    try {
        if(!ubication) {
            throw new Error('Ubication data is required');
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
            data: ubication
        });

        if(!response.data) {
            throw new Error('Error creating ubication');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a ubication
async function update(ubication) {
    try {
        if(!ubication) {
            throw new Error('Ubication data is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}//${ubication.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: ubication
        });

        if(!response.data) {
            throw new Error('Error updating ubication');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to delete a ubication
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Ubication ID is required');
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
            throw new Error('Error deleting ubication');
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