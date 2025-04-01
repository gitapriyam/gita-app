const { app } = require('@azure/functions');
const axios = require('axios');
const { getChaptersUrl, logError } = require('../utils.js');
app.http('chapters', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'chapters', // Define the route here
    handler: async (request, context) => {
        try {
            // Fetch content from a remote server
            const remoteUrl = getChaptersUrl();
            const response = await axios.get(remoteUrl);
            // Return the fetched content
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json' // Explicitly set Content-Type to JSON
                },
                body: JSON.stringify(response.data)
             } 
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            context.log(`Error fetching data from remote server: ${error.message}`);
            logError('Error fetching data from remote server:', error.message);
            return {
                status: 500,
                body: {
                    error: 'Failed to fetch content from the remote server.',
                    details: error.message
                }
            };
        }
    }
});
