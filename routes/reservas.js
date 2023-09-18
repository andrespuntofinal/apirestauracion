const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearReserva, 
    obtenerReservas, 
    obtenerReserva, 
    actualizarReserva, 
    eliminarReserva} = require('../controllers/reservas');
const { existeReservaPorId } = require('../helpers/db-validators');

const router = Router();


//obtener todos los miembros
router.get('/', [
    //validarJWT
], obtenerReservas );

//obtener un miembro por id
router.get('/:id', [
   // validarJWT,
   // check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos,

], obtenerReserva );

//crear un miembro
router.post('/',  [ 
   // validarJWT,
    //esAdminRole,
   // check('miembro', 'El miembro es obligatorio').not().isEmpty(),
    validarCampos
], crearReserva);

//actualizar un miembro
router.put('/:id', [
   // validarJWT,
   // esAdminRole,
   // check('miembro', 'El miembro es obligatorio').not().isEmpty(),
   // check('tipo_aporte').custom( esTipoaporteValido ),
    check('id').custom( existeReservaPorId ),
    validarCampos
], actualizarReserva);

//eliminar un miembro actualizarMiembro
router.delete('/:id', [
   // validarJWT,
   // esAdminRole,
   // check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos
], eliminarReserva );





module.exports = router;