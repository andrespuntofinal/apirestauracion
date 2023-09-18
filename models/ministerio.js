const { Schema, model } = require('mongoose');

const MinisterioSchema = Schema({
    ministerio: {

        type: String,
        required: [true, 'El ministerio es obligatorio']
    }

});


module.exports = model('Ministerio', MinisterioSchema );

