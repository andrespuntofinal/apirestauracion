const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {
        validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRole

 } = require('../middlewares');

const { usuariosGet,
        usuariosGetById,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet );

router.get('/:id', usuariosGetById );

router.put('/:id', [

    check('id', 'No es un Id válido').isMongoId().bail(),
    check('id').custom( existeUsuarioPorId ),
    
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos

] , usuariosPost );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'CONTA_ROLE'),
    check('id', 'No es un Id válido').isMongoId().bail(),
    check('id').custom( existeUsuarioPorId ),
    
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;