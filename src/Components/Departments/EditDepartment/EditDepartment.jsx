import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";



const EditDepartment = () => {

  const navigate = useNavigate();

  const { departmentId } = useParams();



  // Define initial state using useState hook

  const [data, setData] = useState({

    departmentId: 0,

    departmentName: "",

    description: "",

    status: true,

    deaprtmentEmail: null,

  });



  // Fetch department data from API using useEffect hook

  useEffect(() => {

    axios

      .get(

        `https://departmentservice.dev.skillassure.com/department/petzeydepartment/department/departmentbyid/${departmentId}`

      )

      .then((res) => {

        setData(res.data); // Set the department data in state

      })

      .catch((err) => console.log(err));

  }, [departmentId]);



  // Handle form submission

  const handleSubmit = (e) => {

    e.preventDefault();



    axios

      .put(

        `https://departmentservice.dev.skillassure.com/department/petzeydepartment/department/edit/`, data

      )

      .then((response) => {

        navigate("/departments"); // Navigate to the departments page

        console.log(response.data);

        setData(response.data); // Update the department data in state

      })

      .catch((error) => {

        console.error("Error updating department:", error);

      });

  };



  // Handle input change in the form

  const handleInputChange = (e) => {

    const { name, value, type } = e.target;



    if (type === "radio" && name === "status") {

      // Convert the string value to a boolean

      const statusValue = value === "true";

      setData((prevState) => ({

        ...prevState,

        status: statusValue,

      }));

    } else {

      setData((prevState) => ({

        ...prevState,

        [name]: value,

      }));

    }

  };



  return (

    <div>

      <div className="main-wrapper">

        <div className="page-wrapper">

          <div className="content">

            <div className="row">

              <div className="col-lg-8 offset-lg-2">

                <h4 className="page-title">Edit Department</h4>

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

                      value={data.departmentName}

                      onChange={handleInputChange}

                    />

                  </div>

                  <div className="form-group">

                    <label>Description</label>

                    <textarea

                      cols="30"

                      rows="4"

                      className="form-control"

                      name="description"

                      value={data.description}

                      onChange={handleInputChange}

                    ></textarea>

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

                        checked={data.status === true}

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

                        checked={data.status === false}

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

                    <button className="btn btn-primary submit-btn">

                      Save Department

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



export default EditDepartment;