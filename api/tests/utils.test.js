const {
    getSlokaResourceUrl,
    getSlokaAudioUrl,
    getSlokaGroupUrl,
    getChapterResource,
    getChapterAudioURL,
    getChaptersUrl,
    logError,
    validateChapterId
} = require('../src/utils.js');

describe('Utils Module', () => {
    const remoteResource = "https://slokastorage.blob.core.windows.net/gitaresources";
    const prapattiResource = 'https://www.prapatti.com/slokas/sanskrit/bhagavad-giitaa/{chapter}.pdf';

    test('getSlokaResourceUrl should construct the correct URL', () => {
        const url = getSlokaResourceUrl(1, 2, 'english');
        expect(url).toBe(`${remoteResource}/chap01/english_01_02.txt`);
    });

    test('getSlokaAudioUrl should construct the correct audio URL', () => {
        const url = getSlokaAudioUrl(1, 2);
        expect(url).toBe(`${remoteResource}/chap01/01-02.mp3`);
    });

    test('getSlokaGroupUrl should construct the correct sloka group URL', () => {
        const url = getSlokaGroupUrl(1);
        expect(url).toBe(`${remoteResource}/chap01/sloka-groups.json`);
    });

    test('getChapterResource should construct the correct chapter resource URL for Sanskrit', () => {
        const url = getChapterResource(1, 'sanskrit');
        expect(url).toBe(prapattiResource.replace('{chapter}', 'bg_chapter01'));
    });

    test('getChapterResource should construct the correct chapter resource URL for non-Sanskrit', () => {
        const url = getChapterResource(1, 'english');
        expect(url).toBe(`${remoteResource}/chap01/chap01.pdf`);
    });

    test('getChapterAudioURL should construct the correct chapter audio URL', () => {
        const url = getChapterAudioURL(1);
        expect(url).toBe(`${remoteResource}/chap01/chap01.mp3`);
    });

    test('getChaptersUrl should return the correct chapters URL', () => {
        const url = getChaptersUrl();
        expect(url).toBe(`${remoteResource}/chapters.json`);
    });

    test('logError should log the error message and response details', () => {
        const mockContext = {
            log: jest.fn()
        };
        const error = {
            message: 'Test error',
            response: {
                data: 'Error data',
                status: 500
            }
        };

        logError(mockContext, error);

        expect(mockContext.log).toHaveBeenCalledWith('Error:', 'Test error');
        expect(mockContext.log).toHaveBeenCalledWith('Response Data:', 'Error data');
        expect(mockContext.log).toHaveBeenCalledWith('Response Status:', 500);
    });

    test('logError should fallback to console.log if context is not provided', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const error = {
            message: 'Test error',
            response: {
                data: 'Error data',
                status: 500
            }
        };

        logError(null, error);

        expect(consoleSpy).toHaveBeenCalledWith('Error:', 'Test error');
        expect(consoleSpy).toHaveBeenCalledWith('Response Data:', 'Error data');
        expect(consoleSpy).toHaveBeenCalledWith('Response Status:', 500);

        consoleSpy.mockRestore();
    });
});

describe('validateChapterId', () => {
    it('should not throw an error for a valid chapterId', () => {
        expect(() => validateChapterId(0)).not.toThrow();
        expect(() => validateChapterId(10)).not.toThrow();
        expect(() => validateChapterId(19)).not.toThrow();
    });

    it('should throw an error for invalid chapterId', () => {
        expect(() => validateChapterId(null)).toThrow('Invalid chapterId. It must be a positive integer between 0 and 19.');
        expect(() => validateChapterId('abc')).toThrow('Invalid chapterId. It must be a positive integer between 0 and 19.');
        expect(() => validateChapterId(-1)).toThrow('Invalid chapterId. It must be a positive integer between 0 and 19.');
        expect(() => validateChapterId(20)).toThrow('Invalid chapterId. It must be a positive integer between 0 and 19.');
    });
});