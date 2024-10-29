/**
 * eMarketFlowsRestApi class for handling authentication and token management with Auth0.
 */

class client {
    /**
     * Creates an instance of eMarketFlowsRestApi.
     * @param {Object} options - The configuration options.
     * @param {string} options.AUTH0_CLIENT_ID - The Auth0 client ID.
     * @param {string} options.AUTH0_CLIENT_SECRET - The Auth0 client secret.
     * @param {string} options.AUTH0_CLIENT_SCOPES - The Auth0 client scopes.
     * @throws Will throw an error if any of the required options are not provided.
     */
    constructor(options) {
        if (!options) {
            throw new Error('Options must be provided');
        }

        if (!options.AUTH0_CLIENT_ID) {
            throw new Error('AUTH0_CLIENT_ID must be provided');
        }

        if (!options.AUTH0_CLIENT_SECRET) {
            throw new Error('AUTH0_CLIENT_SECRET must be provided');
        }

        if (!options.AUTH0_CLIENT_SCOPES) {
            throw new Error('AUTH0_CLIENT_SCOPES must be provided');
        }

        this.AUTH0_DOMAIN = 'https://api.emarketflows.io/v1/oauth2';
        this.AUTH0_CLIENT_ID = options.AUTH0_CLIENT_ID;
        this.AUTH0_CLIENT_SECRET = options.AUTH0_CLIENT_SECRET;
        this.AUTH0_CLIENT_SCOPES = options.AUTH0_CLIENT_SCOPES;
    }

    /**
     * Saves the token to the cache and sets a timer to refresh the token before it expires.
     * @param {Object} token - The token object.
     * @param {string} token.access_token - The access token.
     * @param {string} token.token_type - The type of the token.
     * @param {number} token.expires_in - The expiration time of the token in seconds.
     */
    saveToken(token) {
        const self = this;
        const success = myCache.set("auth2_token", token);
        
        if (!success) {
            console.error("[oAuth2] eMarket Flows failed to save token to cache.");
        
            // Retry saving the token in 2 minutes
            setTimeout(refreshToken, 120000);
            return;
        }
        
        // Convert token.expires_in date to milliseconds
        const expiresInMs = new Date(token.expires_in);
        
        // Calculate milliseconds from now to token.expires_in milliseconds
        const now = new Date();
        
        const expiresIn = (expiresInMs.getTime() - now.getTime());
        
        console.log(`[oAuth2] eMarket Flows token saved, expires in ${expiresIn} milliseconds.`);

        // Start a timer to refresh the token before it expires
        setTimeout(self.refreshToken, expiresIn);
    }

    /**
     * Authenticates with Auth0 and saves the token to the cache.
     */
    authenticate() {
        const self = this;
        var options = {
            method: 'POST',
            url: `${this.AUTH0_DOMAIN}/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
            grant_type: 'client_credentials',
            client_id: this.AUTH0_CLIENT_ID,
            client_secret: this.AUTH0_CLIENT_SECRET,
            scope: this.AUTH0_CLIENT_SCOPES
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
     * Refreshes the Auth0 token and saves the new token to the cache.
     */
    refreshToken() {
        const self = this;
        var options = {
            method: 'POST',
            url: `${this.AUTH0_DOMAIN}/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
            grant_type: 'client_credentials',
            client_id: this.AUTH0_CLIENT_ID,
            client_secret: this.AUTH0_CLIENT_SECRET,
            scope: this.AUTH0_CLIENT_SCOPES
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
        
        const response = await axios.post(`https://api.emarketflows.io/v1/oauth2/authenticate`, {}, {
            headers: headers
        });

        if(!response) {
            throw ({
                message: "Unauthorized",
                status: 401,
                code: "unauthorized"
            });
        }

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

const v1 = require('./v1');

module.exports = client;
module.exports.v1 = v1;
module.exports.validate = validate;