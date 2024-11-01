const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const BASE_URL = 'orders';
const API_VERSION = 'v1';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the order by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Order ID is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/orders/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Order not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the orders
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
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/orders?${queryString}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Orders not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to add an order
async function add(order) {
    try {
        if(!order) {
            throw new Error('Order is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/orders`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: order
        });

        if(!response.data) {
            throw new Error('Order not added');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update an order
async function update(order) {
    if(!order) {
        throw new Error('Order is required');
    }

    const token = await getTokenFromCache();
            
    const response = await axios.request({
        method: 'PUT',
        url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/orders/${order.id}`,
        headers: { 
            'content-type': 'application/json',
            'authorization': `Bearer ${token.access_token}`,
            'cache-control': 'no-cache'
        },
        data: order
    });

    if(!response.data) {
        throw new Error('Order not updated');
    }

    return response.data;
}

// Implement a function to delete an order
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Order ID is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'DELETE',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/orders/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Order not deleted');
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