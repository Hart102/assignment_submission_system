const Joi = require("joi");
const MULTER = require('multer');
const path = require('path')


const sign_up_auth = Joi.object().keys({ // SIGN-UP FORM VALIDATION
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    dept: Joi.string().required(),
    reg_no: Joi.string().required(),
});

const login_auth = Joi.object().keys({ // SIGN-UP FORM VALIDATION
    firstname: Joi.string().required(),
    reg_no: Joi.string().required(),
});

const lecturer_login = Joi.object().keys({ // LECTURER LOGIN FORM VALIDATION
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const level_auth = Joi.object().keys({ // LEVEL FORM VALIDATION
    level: Joi.string().required(),
    dept: Joi.string().required(),
    course: Joi.string().required(),
});

module.exports ={ 
    sign_up_auth,
    login_auth,
    lecturer_login,
    level_auth
}
