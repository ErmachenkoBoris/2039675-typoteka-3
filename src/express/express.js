'use strict';

const express = require(`express`);

const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const path = require(`path`);
const PUBLIC_DIR = `public`;

const DEFAULT_PORT = 8080;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`views`, [path.resolve(__dirname, `templates`), path.resolve(__dirname, `templates/errors`),
  path.resolve(__dirname, `templates/articles`), path.resolve(__dirname, `templates/main`), path.resolve(__dirname, `templates/my`)]);

app.set(`view engine`, `pug`);

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.get(`*`, function (req, res) {
  res.status(404).render(`404`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render(`500`);
  next();
});


app.listen(DEFAULT_PORT);
