const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// ---- CORS (your existing manual headers) ----
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // dev: allow all
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---- Helmet (security headers) ----
// Put Helmet early, before routes
const isDev = process.env.NODE_ENV !== 'production';
app.use(
  helmet({
    // If CSP is giving you eval errors during local dev, you can
    // TEMPORARILY allow 'unsafe-eval' in dev ONLY. Remove for prod.
    contentSecurityPolicy: isDev
      ? {
          directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-eval'"], // DEV ONLY
            "style-src": ["'self'", "'unsafe-inline'"],
            "connect-src": ["'self'", "http://localhost:3000", "http://localhost:4200"],
            "img-src": ["'self'", "data:"],
            "font-src": ["'self'"],
          },
        }
      : undefined, // leave default Helmet CSP behavior in prod (or set strict directives)
  })
);

// ---- Routes ----

app.post("/api/posts", (req, res, next) =>{
  const posts = req.body
  console.log(posts);
res.status(201).json({
  message: 'Post added'
});
})

app.get('/api/posts', (req, res) => {
  const posts = [
    { id: 'f4344of3',  title: 'First server-side post',  content: 'This is coming from the server' },
    { id: 'f95344of3', title: 'Second server-side post', content: 'This is coming from the server' },
  ];
  res.status(200).json({ message: 'Posts sent', posts });
});

module.exports = app;
