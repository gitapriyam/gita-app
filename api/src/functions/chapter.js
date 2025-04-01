const { app } = require('@azure/functions');
const axios = require('axios');
const { getChaptersUrl, logError, validateChapterId } = require('../utils');

const handler = async (request, context) => {
    try {
        const chapterId = request.params.chapterId;
        context.log('Requested Chapter ID:', chapterId); // Debugging log

        // Validate chapterId (throws an error if invalid)
        validateChapterId(chapterId);

        // Fetch content from a remote server
        const remoteUrl = getChaptersUrl();
        const response = await axios.get(remoteUrl);

        // Determine the structure of response.data
        let chapters;
        if (Array.isArray(response.data.chapters)) {
            chapters = response.data.chapters;
        } else if (response.data && response.data.chapters) {
            chapters = response.data.chapters;
        } else {
            context.log('Unexpected response structure:', response.data);
            return {
                status: 500,
                body: JSON.stringify({ // Serialize the response body
                    error: 'Unexpected response structure from the remote server.'
                })
            };
        }

        // Filter the response for the requested chapterId
        const filteredChapter = chapters.find(chapter => chapter.id === parseInt(chapterId, 10));

        if (!filteredChapter) {
            context.log(`Chapter with id ${chapterId} not found.`);
            return {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // Serialize the response body
                    error: `Chapter with id ${chapterId} not found.`
                })
            };
        }

        context.log(`Filtered Chapter:`, filteredChapter);

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredChapter) // Serialize the response body
        };
    } catch (error) {
        // Handle validation errors or other exceptions
        console.log(`Error: ${error.message}`);
        if (error.message.includes('Invalid chapterId')) {
            return {
                status: 400, // Bad Request
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // Serialize the response body
                    error: error.message
                })
            };
        }

        // Handle other errors (e.g., network issues)
        logError(context, error);
        return {
            status: 500,
            body: JSON.stringify({ // Serialize the response body
                error: 'Failed to fetch content from the remote server.',
                details: error.message
            })
        };
    }
};

app.http('chapter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'chapter/{chapterId}',
    handler
});

module.exports = { app, handler }; // Export both the app and the handler