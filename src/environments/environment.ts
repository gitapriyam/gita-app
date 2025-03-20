export const environment = {
  production: true,
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
  ],
  chapters: [
    { id: 0, english: 'Dhyanam', sanskrit: 'ध्यानम्', url: '/chapter/0', icon: 'folder-outline', slokaCount: 9 },
    { id: 1, english: 'Chapter-01', sanskrit: 'प्रथमः अध्यायः', url: '/chapter/1', icon: 'folder-outline', slokaCount: 47 },
    { id: 2, english: 'Chapter-02', sanskrit: 'द्वितीयः अध्यायः', url: '/chapter/2', icon: 'folder-outline', slokaCount: 72 },
    { id: 3, english: 'Chapter-03', sanskrit: 'तृतीयः अध्यायः', url: '/chapter/3', icon: 'folder-outline', slokaCount: 43 },
    { id: 4, english: 'Chapter-04', sanskrit: 'चतुर्थः अध्यायः', url: '/chapter/4', icon: 'folder-outline', slokaCount: 42 },
    { id: 5, english: 'Chapter-05', sanskrit: 'पञ्चमः अध्यायः', url: '/chapter/5', icon: 'folder-outline', slokaCount: 29 },
    { id: 6, english: 'Chapter-06', sanskrit: 'षष्ठः अध्यायः', url: '/chapter/6', icon: 'folder-outline', slokaCount: 47 },
    { id: 7, english: 'Chapter-07', sanskrit: 'सप्तमः अध्यायः', url: '/chapter/7', icon: 'folder-outline', slokaCount: 30 },
    { id: 8, english: 'Chapter-08', sanskrit: 'अष्टमः अध्यायः', url: '/chapter/8', icon: 'folder-outline', slokaCount: 28 },
    { id: 9, english: 'Chapter-09', sanskrit: 'नवमः अध्यायः', url: '/chapter/9', icon: 'folder-outline', slokaCount: 34 },
    { id: 10, english: 'Chapter-10', sanskrit: 'दशमः अध्यायः', url: '/chapter/10', icon: 'folder-outline', slokaCount: 42 },
    { id: 11, english: 'Chapter-11', sanskrit: 'एकादशः अध्यायः', url: '/chapter/11', icon: 'folder-outline', slokaCount: 55 },
    { id: 12, english: 'Chapter-12', sanskrit: 'द्वादशः अध्यायः', url: '/chapter/12', icon: 'folder-outline', slokaCount: 20 },
    { id: 13, english: 'Chapter-13', sanskrit: 'त्रयोदशः अध्यायः', url: '/chapter/13', icon: 'folder-outline', slokaCount: 35 },
    { id: 14, english: 'Chapter-14', sanskrit: 'चतुर्दशः अध्यायः', url: '/chapter/14', icon: 'folder-outline', slokaCount: 27 },
    { id: 15, english: 'Chapter-15', sanskrit: 'पञ्चदशः अध्यायः', url: '/chapter/15', icon: 'folder-outline', slokaCount: 20 },
    { id: 16, english: 'Chapter-16', sanskrit: 'षोडशः अध्यायः', url: '/chapter/16', icon: 'folder-outline', slokaCount: 24 },
    { id: 17, english: 'Chapter-17', sanskrit: 'सप्तदशः अध्यायः', url: '/chapter/17', icon: 'folder-outline', slokaCount: 28 },
    { id: 18, english: 'Chapter-18', sanskrit: 'अष्टादशः अध्यायः', url: '/chapter/18', icon: 'folder-outline', slokaCount: 78 },
    { id: 19, english: 'Mahatmyam', sanskrit: 'महात्म्यम्', url: '/chapter/19', icon: 'folder-outline', slokaCount: 22 },
  ]
};
