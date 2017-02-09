import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import Config from './server/config/config';
import users from './server/routes/user';
import auth from './server/routes/auth';
import hospitals from './server/routes/hospitals';


let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/hospitals', hospitals);

var morgan = require('morgan'); //used to see requests

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: false
}));

app.use(webpackHotMiddleware(compiler));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(Config.port, () => console.log('running on localhost:'+Config.port));
