const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearMiembro, 
        obtenerMiembros, 
        obtenerMiembro, 
        actualizarMiembro, 
        eliminarMiembro} = require('../controllers/miembros');
const { existeMiembroPorId, esMinisterioValido } = require('../helpers/db-validators');

const router = Router();


//obtener todos los miembros
router.get('/', obtenerMiembros );

//obtener un miembro por id
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeMiembroPorId ),
    validarCampos,

], obtenerMiembro );

//crear un miembro
router.post('/',  [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ministerio').custom( esMinisterioValido ),
    validarCampos
], crearMiembro);

//actualizar un miembro
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ministerio').custom( esMinisterioValido ),
    check('id').custom( existeMiembroPorId ),
    validarCampos
], actualizarMiembro );

//eliminar un miembro actualizarMiembro
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeMiembroPorId ),
    validarCampos
], eliminarMiembro );





module.exports = router;