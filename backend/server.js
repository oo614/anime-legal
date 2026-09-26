const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const anime = [
  {
    id: '1',
    title: 'Legal Demo Trailer',
    description: '演示数据：仅用于展示官方或公开授权视频的播放界面。',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    sources: [
      { id: 's1', label: 'Public-domain sample', type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }
    ]
  }
];

app.get('/api/anime', (_req, res) => res.json(anime));
app.get('/api/anime/:id', (req, res) => {
  const item = anime.find((entry) => entry.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: 'Not found' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running at http://localhost:${port}`));
