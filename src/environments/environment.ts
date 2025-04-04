export const environment = {
  production: true,
  apiUrl: '/api', 
  baseURL: 'https://slokastorage.blob.core.windows.net/gitaresources',
  prapatti: {
    urlTemplate: 'https://www.prapatti.com/slokas/sanskrit/bhagavad-giitaa/{chapter}.pdf'
  },
  title: {
    english: 'Bhagavad Gita',
    sanskrit: 'भगवद्गीता'
  },
  references: [
    'The english translation and the meanings of the Shlokas are attributable to <a href="https://www.dlshq.org" target="_blank">The Divine Life Society</a>',
    'The PDF resources are from <a href="https://www.prapatti.com" target="_blank">Prapatti</a>',
    'The Sandhi Vigraha and Anvaya are from <a href="https://sanskritdocuments.org" target="_blank">Sanskrit Documents</a>' 
  ]
};
