import React from 'react';

const bookmarks = [
  { title: 'Color Hunt', link: 'https://colorhunt.co' },
  { title: 'IconesJS', link: 'https://icones.js.org' },
  { title: 'Freepik', link: 'https://www.freepik.com' },
  { title: 'React Hot Toast', link: 'https://react-hot-toast.com' },
  { title: 'Classnames', link: 'https://www.npmjs.com/package/classnames' },
  { title: 'React Icons', link: 'https://react-icons.github.io/react-icons' },
];

const Bookmarks = () => {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8">
        Sık Kullandığım Bağlantılar
      </h1>

      <ul className="space-y-4">
        {bookmarks.map((bookmark, index) => (
          <li key={index} className="border-b border-neutral-200 dark:border-neutral-700 pb-3">
            <a
              href={bookmark.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {bookmark.title}
            </a>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{bookmark.link}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
