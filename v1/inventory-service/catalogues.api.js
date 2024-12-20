const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');


const API_VERSION = 'v1';
const API_SERVICE = 'inventory';
const API_RESOURCE = 'catalogues';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the push categories by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Catalogue ID is required');
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
            throw new Error('Catalogue not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the catalogues
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
            throw new Error('Catalogues not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to create a catalogue
async function add(catalogue) {
    try {
        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: catalogue
        });

        if(!response.data) {
            throw new Error('Catalogue not created');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a catalogue
async function update(catalogue) {
    try {
        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${API_VERSION}/${API_SERVICE}/${API_RESOURCE}/${catalogue.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: catalogue
        });

        if(!response.data) {
            throw new Error('Catalogue not updated');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to delete a catalogue
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Catalogue ID is required');
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
            throw new Error('Catalogue not deleted');
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