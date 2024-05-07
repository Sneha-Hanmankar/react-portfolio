import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import { debounce } from "./utils";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <input type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

const FormComponent = () => {
  const [errorMsgs, setErrorMsgs] = useState([
    {
      code: 1,
      msg: "Name should not include digits or special characters or empty spaces",
    },
    { code: 2, msg: "Name should not contain Sneha" },
  ]);
  const initVals = {
    name: "",
    email: "",
    age: null,
    category: "",
    gender: "",
    city: "",
    state: "",
    termsNC: "",
    preferences: [],
    bookFor: [],
  };

  const options = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "glutenFree", label: "Gluten-Free" },
  ];

  const categoryOption = [
    { value: "1", label: "Student" },
    { value: "2", label: "Professional" },
    { value: "3", label: "Experienced Professional" },
    { value: "4", label: "None" },
  ];

  const locationDetails = [
    {
      city: "Mumbai",
      state: "Maharashtra",
    },
    { city: "Pune", state: "Maharashtra" },
    { city: "Delhi", state: "Delhi" },
    { city: "Bengaluru", state: "Karnataka" },
    { city: "Chennai", state: "Tamil Nadu" },
    { city: "Kolkata", state: "West Bengal" },
    { city: "Kochi", state: "Kerala" },
    { city: "", state: "None" },
  ];
  let dupArr = [];
  // Custom handleNameChange function for a specific field
  const handleNameChange = (fieldName, value1, form) => {
    const { value } = value1.target;
    form.setFieldValue(fieldName, value);
    let pattern = /^[^\d\W]+$/; //doesnt contains no.
    let pattern1 = /^(?!.*sneha).*$/; //doesnt contain sneha

    if (pattern1.test(value)) {
      dupArr = dupArr.filter((item) => item.code !== 2);
    } else {
      if (dupArr.findIndex((item) => item.code === 2) === -1)
        dupArr.push({ code: 2, msg: "Name should not contain Sneha" });
    }
    if (pattern.test(value)) {
      dupArr = dupArr.filter((item) => item.code !== 1); //remove the first errmsg
    } else {
      if (dupArr.findIndex((item) => item.code === 1) === -1)
        dupArr.push({
          code: 1,
          msg: "Name should not include digits or special characters or empty spaces",
        });
    }
    setErrorMsgs([...dupArr]);
  };

  const getCategory = (event, form) => {
    const catVal = categoryOption.find(
      (item) => item.value === event.target.value
    ).label;
    form.setFieldValue("age", event.target.value);
    form.setFieldValue("category", catVal);
  };

  const getCity = (event, form) => {
    const stateVal = locationDetails.find(
      (item) => item.city === event.target.value
    ).state;
    form.setFieldValue("city", event.target.value);
    form.setFieldValue("state", stateVal);
  };

  return (
    <>
      <h1>Form Component with initial values and custom handlers</h1>
      <Formik
        initialValues={initVals}
        validateOnChange={true} // Set validateOnChange to true
        validate={(values) => {
          const errors = {};
          console.log("values.name", values.name, !values.name);
          // if value.name is null, undefined, false, 0, ''
          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.age) {
            errors.age = "Required";
          }

          if (!values.city) {
            errors.city = "Required";
          }

          if (!values.termsNC) {
            errors.termsNC = "Required";
          }

          if (!values.gender) {
            errors.gender = "Required";
          }

          if (!values.preferences) {
            errors.preferences = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          console.log("errrr", errors, values);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>Name:</div>
            <input
              type="text"
              name="name"
              //   onChange={handleChange}
              onChange={(event) =>
                handleNameChange("name", event, { setFieldValue })
              }
              onBlur={handleBlur}
              value={values.name ?? ""}
            />
            {touched.name && (
              <div>
                {errorMsgs.map((error, index) => (
                  <div key={index}>{error.msg}</div>
                ))}
              </div>
            )}

            <div>Email:</div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email ?? ""}
            />
            {errors.email && touched.email && errors.email}

            <div>Age:</div>
            <Field
              as="select"
              name="age"
              value={values.age || ""}
              onChange={(event) => {
                getCategory(event, { setFieldValue });
              }}
            >
              <option value="1">Age 20-30yrs</option>
              <option value="2">Age 30-40yrs</option>
              <option value="3">Age 40yrs</option>
              <option value="">None</option>
            </Field>
            {errors.age && touched.age && errors.age}

            <div>Category:</div>
            <Field
              name="category"
              component={CustomInputComponent}
              placeholder="Category"
              readOnly
              value={values.category}
            />

            <div>City:</div>
            <Field
              as="select"
              name="city"
              value={values.city || ""}
              onChange={(event) => {
                getCity(event, { setFieldValue });
              }}
            >
              {locationDetails.map((locate) => {
                return (
                  <option value={locate.city} key={`locate-${locate}`}>
                    {locate.city}
                  </option>
                );
              })}
            </Field>
            {errors.city && touched.city && errors.city}

            <div>State:</div>
            <Field
              name="state"
              component={CustomInputComponent}
              placeholder="State"
              readOnly
              value={values.state}
            />

            <div id="my-radio-group">Gender:</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="gender" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="Female" />
                Female
              </label>
            </div>

            {/* value="One"   value being stored. Note that the `value` prop
            on the <Field/> is omitted*/}
            <label>
              <Field type="checkbox" name="termsNC" />
              Accept Terms & Conditions
            </label>

            <div id="prefGroup">Book For:</div>
            <div role="group" aria-labelledby="prefGroup">
              <label>
                <Field type="checkbox" name="bookFor" value="1" />
                Today
              </label>
              <label>
                <Field type="checkbox" name="bookFor" value="2" />
                Next day
              </label>
            </div>

            <div>Preferences:</div>
            <Field name="preferences">
              {({ field }) => (
                <Select
                  isMulti
                  name="preferences"
                  value={values.preferences}
                  options={options}
                  multiple={true}
                  onChange={(selectedOptions) => {
                    console.log("values", selectedOptions);
                    setFieldValue("preferences", [...selectedOptions]);
                  }}
                />
              )}
            </Field>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormComponent;

// already initialize on first load the value in the form
// one element dependency on other to clear out or validate certain logics/rules
// disable logic only for one element
// error msg rule for only one element
// clear all the values after submit and page redirection or if the values are inputed wrongly
// highlight the element incase of error or warning

//Name - textField - mandatory
//age - dropdown - 20-30, 30-40 , Above 40 , None -Mandatory
//state depends on city - object (dropdown) , if user selects Mumbai , Pune automatically state will be Maharashtra - mandatory
// if age - 20-30 - category - to be populated with value- Student , Professional, Experienced Professional, None - '' (it should nt accept any other values) (read only)
//Email id - Mandatory
//Gender - radio btn - male/female - Mandatory
//T&C - checkbox - Mandatory
// Preference - multiselect -  Veg / Non Veg / Jain /Continental/ Mexican / Italian / Vegan -  - optional

// eslint-disable-next-line no-lone-blocks
{
  /* <Field
              name="preferences"
              as="select"
              multiple // Enable multi-select
              onChange={(event) => {
                // Get selected options and convert them to an array
                const selectedOptions = Array.from(
                  event.target.selectedOptions,
                  (option) => option.value
                );
                // Set the field value to the array of selected options
                setFieldValue("preferences", selectedOptions);
              }}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              {/* Add more options as needed */
}
// </Field> */}
