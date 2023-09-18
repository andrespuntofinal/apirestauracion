const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares');

const router = Router();


router.post('/login', login );

router.post('/google', [

    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

module.exports = router;