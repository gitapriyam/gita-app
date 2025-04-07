const { app } = require('@azure/functions');
const { getChapterResource, logError, validateChapterId, validateContent } = require('./utils.js');
app.http('chapterResource', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'chapterResource/{chapterId}',
    handler: async (request, context) => {
        try {
            // Extract route parameters from request.params
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId)
            // Extract query parameter for language (default to 'english')
            const content = request.query.get('content') || 'english';
            validateContent(content); // Validate content (throws an error if invalid)

            remoteUrl = getChapterResource(chapterId, content);
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json' // Explicitly set Content-Type to JSON
                },
                body: JSON.stringify({ url: remoteUrl }) // Serialize the body to JSON
            };
        } catch (error) {
            // Handle errors (e.g., network issues, server errors)
            context.log(`Error generation PDF URL: ${error}`);
            logError('Error generation PDF URL', error.message);
            return {
                status: 500,
                body: {
                    error: 'Error generation PDF URL.',
                    details: error.message
                }
            };
        }

        return { body: `Hello, ${name}!` };
    }
});
