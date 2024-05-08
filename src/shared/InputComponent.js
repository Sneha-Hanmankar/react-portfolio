import React from "react";
import { Field } from "formik";

const InputComponent = (type, name, values) => {
  return (
    <Field
      type="email"
      name="email"
      //   onChange={handleChange}
      //   onBlur={handleBlur}
      value={values.email ?? ""}
    />
  );
};

export default InputComponent;
