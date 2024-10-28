const axios = require('axios');
const myCache = require("../../cache/cache.js");
const config = require('../../config.js');

const BASE_URL = 'invoices';
const API_VERSION = 'v1';

// Implement a function to get the token from the cache myCache
function getTokenFromCache() {
    return myCache.get("auth2_token");
}

// Implement a function to get the invoice by ID
async function get(id) {
    try {
        if(!id) {
            throw new Error('Invoice ID is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'GET',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/invoices/${id}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Invoice not found');
        }

        provider = response.data;

        return provider;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to get the invoices
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
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/invoices?${queryString}`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            }
        });

        if(!response.data) {
            throw new Error('Invoices not found');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to add an invoice
async function add(invoice) {
    try {
        if(!invoice) {
            throw new Error('Invoice is required');
        }

        const token = await getTokenFromCache();
                
        const response = await axios.request({
            method: 'POST',
            url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/invoices`,
            headers: { 
                'content-type': 'application/json',
                'authorization': `Bearer ${token.access_token}`,
                'cache-control': 'no-cache'
            },
            data: invoice
        });

        if(!response.data) {
            throw new Error('Invoice not added');
        }

        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// Implement a function to update an invoice
async function update(invoice) {
    if(!invoice) {
        throw new Error('Invoice is required');
    }

    const token = await getTokenFromCache();

    const response = await axios.request({
        method: 'PUT',
        url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/invoices/${invoice.id}`,
        headers: { 
            'content-type': 'application/json',
            'authorization': `Bearer ${token.access_token}`,
            'cache-control': 'no-cache'
        },
        data: invoice
    });

    if(!response.data) {
        throw new Error('Invoice not updated');
    }

    return response.data;
}

// Implement a function to delete an invoice
async function remove(id) {
    if(!id) {
        throw new Error('Invoice ID is required');
    }

    const token = await getTokenFromCache();

    const response = await axios.request({
        method: 'DELETE',
        url: `${config.MS_API_URL}/${API_VERSION}/${BASE_URL}/invoices/${id}`,
        headers: { 
            'content-type': 'application/json',
            'authorization': `Bearer ${token.access_token}`,
            'cache-control': 'no-cache'
        }
    });

    if(!response.data) {
        throw new Error('Invoice not deleted');
    }

    return response.data;
}

module.exports = {
    get,
    list,
    add,
    update,
    remove
};