import UglifyJS from 'uglify-js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { js } = req.body;
    const result = UglifyJS.minify(js);
    if (result.error) {
      res.status(500).json({ error: result.error.message });
    } else {
      res.status(200).json({ minified: result.code });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
