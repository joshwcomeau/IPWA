import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser           from 'body-parser';

import routes from './routes';
import config from '../webpack.dev';


const app     = new express();
const port    = 3000;
const bundler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(webpackDevMiddleware(bundler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
  stats: { colors: true }
}));

app.use(webpackHotMiddleware(bundler));

routes(app);

app.listen(port, err => {
  err ? console.error(error) : console.info(`🌎  Listening on port ${port}`)
});
