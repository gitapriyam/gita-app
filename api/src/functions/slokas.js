const axios = require('axios');
const { app } = require('@azure/functions');
const { getSlokaResourceUrl, logError, validateContent } = require('../utils.js');
const { handler: chapterHandler } = require('./chapter');

app.http('slokas', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'slokas/{chapterId}',
    handler: async (request, context) => {
        try {
            context.log(`Http function processed request for url "${request.url}"`);
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId);
            
            const content = request.query.get('content') || 'english';
            validateContent(content); // Validate content (throws an error if invalid)
           
            slokaArray = [];
            const chapterResponse = await chapterHandler(
                { params: { chapterId } }, // Simulate the request object
                context
            );
           
            const chapter = JSON.parse(chapterResponse.body);
            slokaCount = chapter.slokaCount;
            for (let slokaIndex = 1; slokaIndex <= slokaCount; slokaIndex++) {
                const remoteUrl = getSlokaResourceUrl(chapterId, slokaIndex, content);
                const response = await axios.get(remoteUrl);
                slokaArray[slokaIndex] = response.data;
            }
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json' // Explicitly set Content-Type to JSON
                },
                body: JSON.stringify({ slokas: slokaArray }) // Serialize the body to JSON
            };
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            console.log(`Error fetching content: ${error}`);
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
