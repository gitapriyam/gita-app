const { app } = require('@azure/functions');
const { getChapterAudioURL,logError, validateChapterId } = require('../utils.js');

app.http('chapterAudio', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'chapterAudio/{chapterId}', 
    handler: async (request, context) => {
        try {
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId); // Validate chapterId (throws an error if invalid)
        
            // Construct the remote audio URL
            const remoteAudioUrl = getChapterAudioURL(chapterId);
            context.log(`Generated audio URL: ${remoteAudioUrl}`);

            // Return the audio URL as a JSON response
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: remoteAudioUrl })
            };
        } catch (error) {
            context.log(`Error generating audio URL for Chapter ${chapterId}: ${error}`);
            logError(`Error generating audio URL for Chapter ${chapterId}`, error.message);
            context.res = {
                status: 500,
                body: `Error generating audio URL for Chapter ${chapterId}.`
            };
        }
    }
});
