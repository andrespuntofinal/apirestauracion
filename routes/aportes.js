const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearAporte, 
        obtenerAportes, 
        obtenerAporte, 
        actualizarAporte, 
        eliminarAporte} = require('../controllers/aportes');
const { existeAportePorId, esTipoaporteValido } = require('../helpers/db-validators');

const router = Router();


//obtener todos los miembros
router.get('/', [
    validarJWT
], obtenerAportes );

//obtener un miembro por id
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeAportePorId ),
    validarCampos,

], obtenerAporte );

//crear un miembro
router.post('/',  [ 
    validarJWT,
    esAdminRole,
    check('miembro', 'El miembro es obligatorio').not().isEmpty(),
    check('tipo_aporte').custom( esTipoaporteValido ),
    validarCampos
], crearAporte);

//actualizar un miembro
router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('miembro', 'El miembro es obligatorio').not().isEmpty(),
    check('tipo_aporte').custom( esTipoaporteValido ),
    check('id').custom( existeAportePorId ),
    validarCampos
], actualizarAporte );

//eliminar un miembro actualizarMiembro
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeAportePorId ),
    validarCampos
], eliminarAporte );





module.exports = router;