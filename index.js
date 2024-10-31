/**
 * eMarketFlowsRestApi class for handling authentication and token management with Auth2.
 */

const config = require('./config.js');
const axios = require('axios');
const myCache = require("./cache/cache.js");

class client {
    /**
     * Creates an instance of eMarketFlowsRestApi.
     * @param {Object} options - The configuration options.
     * @param {string} options.AUTH2_CLIENT_ID - The Auth2 client ID.
     * @param {string} options.AUTH2_CLIENT_SECRET - The Auth2 client secret.
     * @param {string} options.AUTH2_CLIENT_SCOPES - The Auth2 client scopes.
     * @throws Will throw an error if any of the required options are not provided.
     */
    constructor(options) {
        if (!options) {
            console.log('[EMF_SDK] Options must be provided');
            throw new Error('Options must be provided');
        }

        if (!options.AUTH2_CLIENT_ID) {
            console.log('[EMF_SDK] AUTH2_CLIENT_ID must be provided');
            throw new Error('AUTH2_CLIENT_ID must be provided');
        }

        if (!options.AUTH2_CLIENT_SECRET) {
            console.log('[EMF_SDK] AUTH2_CLIENT_SECRET must be provided');
            throw new Error('AUTH2_CLIENT_SECRET must be provided');
        }

        if (!options.AUTH2_CLIENT_SCOPES) {
            console.log('[EMF_SDK] AUTH2_CLIENT_SCOPES must be provided');
            throw new Error('AUTH2_CLIENT_SCOPES must be provided');
        }

        this.AUTH2_DOMAIN = `${config.MS_API_URL}/v1/oauth2`;
        this.AUTH2_CLIENT_ID = options.AUTH2_CLIENT_ID;
        this.AUTH2_CLIENT_SECRET = options.AUTH2_CLIENT_SECRET;
        this.AUTH2_CLIENT_SCOPES = options.AUTH2_CLIENT_SCOPES;
    }

    /**
     * Saves the token to the cache and sets a timer to refresh the token before it expires.
     * @param {Object} token - The token object.
     * @param {string} token.access_token - The access token.
     * @param {string} token.token_type - The type of the token.
     * @param {number} token.expires_in - The expiration time of the token in seconds.
     */
    saveToken(token) {
        console.log("[EMF_SDK] Saving token to cache...");

        const self = this;
        const success = myCache.set("auth2_token", token);
        
        if (!success) {
            console.error("[EMF_SDK] Fail saving token in cache.");
        
            // Retry saving the token in 1 minute
            setTimeout(refreshToken, 60000);
            return;
        }
        
        // Convert token.expires_in date to milliseconds
        const expiresInMs = new Date(token.expires_in);
        
        // Calculate milliseconds from now to token.expires_in milliseconds
        const now = new Date();
        
        const expiresIn = (expiresInMs.getTime() - now.getTime());
        
        console.log(`[EMF_SDK] Token saved, expires in ${expiresIn}ms.`);

        // Start a timer to refresh the token before it expires
        setTimeout(self.refreshToken, expiresIn);
    }

    /**
     * Authenticates with Auth2 and saves the token to the cache.
     */
    authenticate() {
        console.log("[EMF_SDK] Authenticating...");
        console.log(`[EMF_SDK] Client ID: ${this.AUTH2_CLIENT_ID}`);
        console.log(`[EMF_SDK] Client Scopes: ${this.AUTH2_CLIENT_SCOPES}`);

        const self = this;
        var options = {
            method: 'POST',
            url: `${this.AUTH2_DOMAIN}/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                grant_type: 'client_credentials',
                client_id: this.AUTH2_CLIENT_ID,
                client_secret: this.AUTH2_CLIENT_SECRET,
                scope: this.AUTH2_CLIENT_SCOPES
            }
        };
            
        axios.request(options).then(function (response) {
            // Save the token to the cache
            self.saveToken(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    /**
     * Refreshes the AUTH2 token and saves the new token to the cache.
     */
    refreshToken() {
        console.log("[EMF_SDK] Refreshing token...");
        
        const self = this;
        var options = {
            method: 'POST',
            url: `${this.AUTH2_DOMAIN}/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
            grant_type: 'client_credentials',
            client_id: this.AUTH2_CLIENT_ID,
            client_secret: this.AUTH2_CLIENT_SECRET,
            scope: this.AUTH2_CLIENT_SCOPES
            }
        };
            
        axios.request(options).then(function (response) {
            // Save the token to the cache
            self.saveToken(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

/**
 * Middleware to authenticate requests using the provided scopes.
 * @param {...string} scopes - The required scopes for the request.
 * @returns {Function} The middleware function.
 */
validate = (...scopes) => async (req, res, next) => {
    try {
        console.log("[EMF_SDK] Validating token scopes...");
        console.log("[EMF_SDK] Required scopes: " + scopes.join(" "));

        if (!req.headers.authorization) {
            throw ({
                message: "Requires authentication token",
                status: 401,
                code: "unauthorized"
            });
        }

        var headers = {
            "Content-Type": "application/json",
            "Authorization": req.headers.authorization,
            "x-auth-scopes": scopes.join(" ")
        };

        if(req.params.organization) {
            headers["x-auth-organization"] = req.params.organization;
        }

        if(req.headers["x-auth-organization"]) {
            headers["x-auth-organization"] = req.headers["x-auth-organization"];
        }
        
        const response = await axios.post(`${config.MS_API_URL}/v1/oauth2/authenticate`, {}, {
            headers: headers
        });

        if(!response) {
            console.log("[EMF_SDK] Token is not valid.");
            throw ({
                message: "Unauthorized",
                status: 401,
                code: "unauthorized"
            });
        }

        console.log("[EMF_SDK] Token is valid.");

        req.scope = response.data.scope.split(" ");
        req.role = response.data.role;
        req.userId = response.data.user;

        next();
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500,
            code: error.code || "internal_server_error"
        });
    }
}

const v1 = require('./v1/index');

module.exports = client;
module.exports.v1 = v1;
module.exports.validate = validate;