import Joi from "joi";

export const validateCreateNewUser = (req,res,next) => {
  const schemaRules = {
    username: Joi.string().min(2),
    password: Joi.string().required().min(2),
    email: Joi.string().email({ tlds: { allow: false } }),
    role: Joi.string().valid("I","T","S").required()
  };

  const schema = Joi.object(schemaRules);
  
  validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: false // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    error.status = 400;
    error.message=`Validation error: ${error.details.map(x => x.message).join(', ')}`;
    next(error);
  } else {
    req.body = value;
    next();
  }
}
