const axios = require('axios');
const { app } = require('@azure/functions');
const { getSlokaGroupUrl, logError, validateChapterId } = require('./utils.js');

app.http('slokaGroups', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'slokaGroups/{chapterId}', // Updated route to use 'slokaGroups'
    handler: async (request, context) => {
        try {
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId); // Validate chapterId (throws an error if invalid)
        
            const remoteResourceUrl = getSlokaGroupUrl(chapterId);
            context.log(`Generated Sloka Groups URL: ${remoteResourceUrl}`);
            const response = await axios.get(remoteResourceUrl);
            context.log(`Response from remote server: ${response.data}`);
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response.data) // Serialize the body to JSON
            };
        } catch (error) {
            logError('Error fetching data from remote server:', error.message);
            return {
                status: 500,
                body: {
                    error: 'Failed to fetch content from the remote server.',
                    details: error.message
                }
            }
        }
    }
});


