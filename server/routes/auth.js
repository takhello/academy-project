import express from 'express';

import Auth from '../controllers/auth';

const router = express.Router();


router.post('/login', Auth.login)


router.post('/signup', Auth.signup)


export default router;


