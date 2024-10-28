const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const BASE_URL = 'contacts';
const API_VERSION = 'v1';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the provider by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Provider ID is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/providers/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Provider not found');
        }

        provider = response.data;

        return provider;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the providers
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
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/providers?${queryString}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Providers not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to create a provider
async function add(provider) {
    try {
        if(!provider) {
            throw new Error('Provider data is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${BASE_URL}/providers`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: provider
        });

        if(!response.data) {
            throw new Error('Error creating provider');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a provider
async function update(provider) {
    try {
        if(!provider) {
            throw new Error('Provider data is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${BASE_URL}/providers/${provider.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: provider
        });

        if(!response.data) {
            throw new Error('Error updating provider');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to delete a provider
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Provider ID is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'DELETE',
            url: `${config.MS_API_URL}/${BASE_URL}/providers/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Provider not deleted');
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