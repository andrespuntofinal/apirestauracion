const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearEvento, 
    obtenerEventos, 
    obtenerEvento, 
    actualizarEvento, 
    eliminarEvento} = require('../controllers/eventos');
const { existeEventoPorId } = require('../helpers/db-validators');

const router = Router();


//obtener todos los miembros
router.get('/', [
    //validarJWT
], obtenerEventos );

//obtener un miembro por id
router.get('/:id', [
   // validarJWT,
   // check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos,

], obtenerEvento );

//crear un miembro
router.post('/',  [ 
   // validarJWT,
    //esAdminRole,
   // check('miembro', 'El miembro es obligatorio').not().isEmpty(),
    validarCampos
], crearEvento);

//actualizar un miembro
router.put('/:id', [
   // validarJWT,
   // esAdminRole,
   // check('miembro', 'El miembro es obligatorio').not().isEmpty(),
   // check('tipo_aporte').custom( esTipoaporteValido ),
    check('id').custom( existeEventoPorId ),
    validarCampos
], actualizarEvento);

//eliminar un miembro actualizarMiembro
router.delete('/:id', [
   // validarJWT,
   // esAdminRole,
   // check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos
], eliminarEvento );





module.exports = router;