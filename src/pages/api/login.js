import cookie from 'cookie';

export default (req, res) => {
  if (req.method === 'POST') {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      // Passwords match
      res.setHeader('Set-Cookie', cookie.serialize('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      }));
      res.status(200).json({ success: true });
    } else {
      // Passwords don't match
      res.status(403).json({ success: false });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};
