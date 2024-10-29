const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const BASE_URL = 'contacts';
const API_VERSION = 'v1';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the customer by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Customer ID is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}${BASE_URL}/customers/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Customer not found');
        }

        customer = response.data;

        return customer;
    } catch (error) {
        throw error;
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
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/customers?${queryString}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Customers not found');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}

// Implement a function to create a customer
async function add(customer) {
    try {
        if(!customer) {
            throw new Error('Customer data is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${BASE_URL}/customers`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: customer
        });

        if(!response.data) {
            throw new Error('Error creating customer');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update a customer
async function update(customer) {
    try {
        if(!customer) {
            throw new Error('Customer data is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'PUT',
            url: `${config.MS_API_URL}/${BASE_URL}/customers/${customer.id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: customer
        });

        if(!response.data) {
            throw new Error('Error updating customer');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to delete a customer
async function remove(id) {
    try {
        if(!id) {
            throw new Error('Customer ID is required');
        }

        const token = await getTokenFromCache();

        const response = await axios.request({
            method: 'DELETE',
            url: `${config.MS_API_URL}/${BASE_URL}/customers/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Error deleting customer');
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