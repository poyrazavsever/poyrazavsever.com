import Parser from 'rss-parser';

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''; // ❗ Güvenli erişim
}

export default async function handler(req, res) {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL('https://medium.com/feed/@poyrazavsever');

    const articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));

    res.status(200).json(articles);
  } catch (error) {
    console.error('Medium API hatası:', error);
    res.status(500).json({
      message: 'Medium verileri alınamadı.',
      error: error.message,
    });
  }
}
