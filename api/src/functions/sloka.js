const axios = require('axios');
const { app } = require('@azure/functions');
const { getSlokaResourceUrl, logError, validateChapterId, validateSlokaId } = require('./utils.js');

app.http('sloka', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'sloka/{chapterId}/{slokaIndex}', // Define the route here
    handler: async (request, context) => {
        try {
            // Extract route parameters from request.params
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId); // Validate chapterId (throws an error if invalid)
            // Extract slokaIndex from request.params
            const slokaIndex = request.params.slokaIndex;
            validateSlokaId(slokaIndex); // Validate slokaIndex (throws an error if invalid)

            // Extract query parameter for language (default to 'english')
            const content = request.query.get('content') || 'english';

            // Fetch content from a remote server
            const remoteUrl = getSlokaResourceUrl(chapterId, slokaIndex, content);
            const response = await axios.get(remoteUrl);
            // Return the fetched content
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json' // Explicitly set Content-Type to JSON
                },
                body: JSON.stringify({ content: response.data }) // Serialize the body to JSON
            };
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            context.log(`Error fetching content: ${error}`);
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
