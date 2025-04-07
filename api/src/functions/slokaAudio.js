const axios = require('axios');
const { app } = require('@azure/functions');
const { getSlokaAudioUrl, logError, validateChapterId, validateSlokaId } = require('./utils.js');

app.http('slokaAudio', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'slokaAudio/{chapterId}/{slokaId}', // Updated route to use 'slokaAudio'
    handler: async (request, context) => {
        try {
            const chapterId = request.params.chapterId;
            validateChapterId(chapterId); // Validate chapterId (throws an error if invalid)

            const slokaId = request.params.slokaId;
            validateSlokaId(slokaId); // Validate slokaId (throws an error if invalid)
            // Construct the remote audio URL
            const remoteAudioUrl = getSlokaAudioUrl(chapterId, slokaId);

            // Return the audio URL as a JSON response
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: remoteAudioUrl })
            };
        } catch (error) {
            logError(`Error generating audio URL for Chapter ${chapterId}, Sloka ${slokaId}:`, error.message);
            context.res = {
                status: 500,
                body: `Error generating audio URL for Chapter ${chapterId}, Sloka ${slokaId}.`
            };
        }
    }
});
