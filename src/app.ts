import express from 'express';
import bodyParser from 'body-parser';
import ErrorHandler from './utils/ErrorHandler';
import user from './routes/user/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);

app.use('/api/user', user);

const errorHandler: ErrorHandler = new ErrorHandler();

app.use(errorHandler.noFoundError);
app.use(errorHandler.errorResponse);

app.listen(app.get('port'), () => {
  console.log(`Listening on port: ${app.get('port')}`);
});
