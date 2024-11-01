const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const API_VERSION = 'v1';
const API_SERVICE = 'notifications';
const API_RESOURCE = 'push';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the push notification by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Push notification ID is required');
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
            throw new Error('Push notification not found');
        }

        const push = response.data;

        return push;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the push notifications
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
            throw new Error('Push notifications not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to add a push notification
async function add(push) {
    try {
        if(!push) {
            throw new Error('Push notification is required');
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
            throw new Error('Push notification not added');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a push notification
async function update(push) {
    if(!push) {
        throw new Error('Push notification is required');
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
        throw new Error('Push notification not updated');
    }

    return response.data;
}

// Implement a function to delete a push notification
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Push notification ID is required');
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
            throw new Error('Push notification not deleted');
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