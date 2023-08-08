import * as yup from "yup"

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email"),
  name: yup.string().matches(USER_REGEX, { message: "3 to 24 characters. Must begin with a letter." }),
  profession: "",
  password: yup.string()
    .matches(PWD_REGEX, { message: "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character ($, %, #, @)"})
})