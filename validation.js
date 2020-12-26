//Validation package
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(8).required(),
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;