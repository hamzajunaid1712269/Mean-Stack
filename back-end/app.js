const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const Post = require('./models/post')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mean')  // "mean" db will be created on first save
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error:', err));


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
  const posts = new Post({
   title: req.body.title,
   content: req.body.content
  });
  posts.save();
  console.log(posts);
res.status(201).json({
  message: 'Post added'
});
})

app.get('/api/posts', async (req, res, next) => {
  try {
    const docs = await Post.find().lean(); // lean() returns plain objects
    const posts = docs.map(d => ({
      id: d._id.toString(),   // map Mongo _id -> id for the front-end
      title: d.title,
      content: d.content,
    }));
    return res.status(200).json({ message: 'Posts sent', posts });
  } catch (err) {
    next(err);
  }
});


app.delete('/api/posts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // optional: validate ObjectId (avoids CastError noise)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const result = await Post.deleteOne({ _id: id }); // <-- use Post, not this.post
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});
module.exports = app;
