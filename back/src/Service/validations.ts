import validator from "validator";
import Joi from "joi";

import ValidationError from "../Error/ValidationError";

export const validateUUID = (id: string): void => {
  if (!validator.isUUID(id)) {
    throw new ValidationError("Id must be a UUID");
  }
};

export const validatePassword = (credential: string): void => {
  // validate it is string with joi libray
  if (Joi.string().validate(credential).error) {
    throw new ValidationError("Credential invalid");
  }
};

export const validateEmail = (email: string): void => {
  if (!validator.isEmail(email)) {
    throw new ValidationError("Email invalid");
  }
};

const userSchema = Joi.object({
  dni: Joi.string()
    .min(6)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().alphanum().min(3).max(50).required(),
  lastName: Joi.string().alphanum().min(3).max(50).required(),
  role: Joi.string().valid("user", "admin").required(),
  id_credential: Joi.string().uuid().optional(),
});

export const validateUser = (userToValid: object) => {
  const { error } = userSchema.validate(userToValid);
  if (error) {
    console.log(error);

    throw new ValidationError("User format invalid");
  }
};

const StepSchema = Joi.object({
  content: Joi.string().alphanum().min(3).max(100).required(),
  order: Joi.number().integer().min(1).required().max(50),
  id_routine: Joi.string().uuid().optional(),
});

const RoutineSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(50).required(),
  gif: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .regex(/\.(gif)$/)
    .optional(),
  steps: Joi.array().items(StepSchema).required(),
  id_part: Joi.number().min(0).max(200).required(),
});

export const validateRoutine = (routineToValidate: object) => {
  const { error } = RoutineSchema.validate(routineToValidate);
  console.log(error);

  if (error) {
    throw new ValidationError("Routine invalid");
  }
};
