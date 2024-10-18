import CleanCSS from 'clean-css';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { css } = req.body;
    const output = new CleanCSS().minify(css);
    res.status(200).json({ minified: output.styles });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
