import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import * as Yup from "yup";



const AddDepartment = () => {

  const [department, setDepartment] = useState({

    departmentName: "",

    description: "",

    status: true,

    deaprtmentEmail: "string",

    departmentId: 1,

  });



  let navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);

  const [formErrors, setFormErrors] = useState({});



  // Handle input change event

  const handleInputChange = (event) => {

    const { name, value } = event.target;



    let inputValue = value;



    // Convert status value to boolean

    if (name === "status") {

      inputValue = value === "true";

    }



    setDepartment((prevState) => ({

      ...prevState,

      [name]: inputValue,

    }));

  };



  // Handle form submit

  const handleSubmit = async (e) => {

    e.preventDefault();



    // Validate form

    const errors = await validate(department);

    setFormErrors(errors);

    setIsSubmit(true);



    // Send a POST request to create a department if there are no errors

    if (Object.keys(errors).length === 0) {

      axios

        .post(

          "https://departmentservice.dev.skillassure.com/department/petzeydepartment/department/create",

          department

        )

        .then((res) => {

          // Navigate to the "/departments" page after successfully creating a department

          navigate("/departments");

        })

        .catch((err) => console.log(err));

    }

  };



  // Perform side effects when formErrors changes

  useEffect(() => {

    // If there are no form errors and the form has been submitted, log the department

    if (Object.keys(formErrors).length === 0 && isSubmit) {

      console.log(department);

    }

  }, [formErrors, department, isSubmit]);



  // Define the validation schema

const validationSchema = Yup.object().shape({

  departmentName: Yup.string()

    .required("Department name is required!")

    .matches(/^[a-zA-Z0-9 ]*$/, "Department name should not contain special characters!")

    .min(5, "Department name should be at least 5 characters long"),

  description: Yup.string()

    .required("Description is required!")

    .matches(/^[a-zA-Z0-9 ]*$/, "Description should not contain special characters!")

    .min(10, "Description should be at least 10 characters long"),

});

  // Form validation

  const validate = async (values) => {

    try {

      await validationSchema.validate(values, { abortEarly: false });

      return {}; // No validation errors

    } catch (error) {

      // Collect the validation errors

      const errors = {};

      error.inner.forEach((err) => {

        errors[err.path] = err.message;

      });

      return errors;

    }

  };



  return (

    <div>

      <div className="main-wrapper">

        <div className="page-wrapper">

          <div className="content">

            <div className="row">

              <div className="col-lg-8 offset-lg-2">

                <h4 className="page-title">Add Department</h4>

              </div>

            </div>

            <div className="row">

              <div className="col-lg-8 offset-lg-2">

                <form onSubmit={handleSubmit}>

                  <div className="form-group">

                    <label>Department Name</label>

                    <input

                      className="form-control"

                      type="text"

                      name="departmentName"

                      value={department.departmentName}

                      onChange={handleInputChange}

                    />

                    {formErrors.departmentName && (

                      <span className="text-danger">

                        {formErrors.departmentName}

                      </span>

                    )}

                  </div>

                  <div className="form-group">

                    <label>Description</label>

                    <textarea

                      cols="30"

                      rows="4"

                      className="form-control"

                      name="description"

                      value={department.description}

                      onChange={handleInputChange}

                    ></textarea>

                    {formErrors.description && (

                      <span className="text-danger">

                        {formErrors.description}

                      </span>

                    )}

                  </div>

                  <div className="form-group">

                    <label className="display-block">Department Status</label>

                    <div className="form-check form-check-inline">

                      <input

                        className="form-check-input"

                        type="radio"

                        name="status"

                        id="product_active"

                        value="true"

                        checked={department.status === true}

                        onChange={handleInputChange}

                      />

                      <label

                        className="form-check-label"

                        htmlFor="product_active"

                      >

                        Active

                      </label>

                    </div>

                    <div className="form-check form-check-inline">

                      <input

                        className="form-check-input"

                        type="radio"

                        name="status"

                        id="product_inactive"

                        value="false"

                        checked={department.status === false}

                        onChange={handleInputChange}

                      />

                      <label

                        className="form-check-label"

                        htmlFor="product_inactive"

                      >

                        Inactive

                      </label>

                    </div>

                  </div>

                  <div className="m-t-20 text-center">

                    <button className="btn btn-primary submit-btn" type="submit">

                      Create Department

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};



export default AddDepartment;

