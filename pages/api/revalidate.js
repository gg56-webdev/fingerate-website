export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req.query.sotId) {
    return res.status(400).json({ message: 'No sotId provided' });
  }

  try {
    await Promise.all([res.revalidate('/sots'), res.revalidate(`/sots/${req.query.sotId}`), res.revalidate('/map')]);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
