import express from 'express';
import login from './login';
import list from './list';
import save from './save';
import update from './update';
import remove from './remove';

const router = express.Router();

router.post('/login', login);
router.put('/save', save);
router.post('/update', update);
router.post('/remove', remove);
router.get('/list', list);

export default router;
