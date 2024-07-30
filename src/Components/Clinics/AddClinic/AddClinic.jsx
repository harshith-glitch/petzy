import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./addclinic.css";





const AddClinic = () => {

  const [inputData, setInputData] = useState({

    clinicId: 0,

    clinicInfo: "",

    clinicName: "",

    status: "PENDING",

    timings:"",

    location: "",

    phoneNumber: "",

    description: ""

  });





  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});





  const handleInputChange = (event) => {

    const { name, value } = event.target;

    setInputData((prevState) => ({

      ...prevState,

      [name]: value

    }));

  };





  const handleSubmit = (event) => {

    event.preventDefault();

    const errors = validate(inputData);

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {

      axios.post("https://clinicservice.dev.skillassure.com/clinic/clinics/create/clinic", inputData).then((res) => {

        navigate("/clinic");

      }).catch((err) => console.log(err));

    }

  };





  const validate = (values) => {

    const errors = {};

    const requiredFields = [

      "clinicName",

      "clinicInfo",

      "location",

      "timings",

      "phoneNumber"

    ];

    requiredFields.forEach((field) => {

      if (!values[field]) {

        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)

          } is required!`;

      }

    });

    return errors;

  };





  return (

    <div>

      <div className="main-wrapper">

        <div className="page-wrapper">

          <div className="content">

            <div className="row">

              <div className="col-lg-8 offset-lg-2">

                <h4 className="page-title">Add Clinic</h4>

              </div>

            </div>

            <div className="row">

              <div className="col-lg-8 offset-lg-2">

                <form 
                onSubmit={handleSubmit}
                >


                  <div className="row">

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Clinic Info</label>

                        <input className={

                          `form-control ${formErrors.clinicInfo && !inputData.clinicInfo ? "error" : ""


                          }`


                        }

                          type="text"
                          data-testid="clinicInfo"

                          name="clinicInfo"

                          value={

                            inputData.clinicInfo

                          }


                          onChange={handleInputChange} /> {

                          formErrors.clinicInfo && !inputData.clinicInfo && (

                            <span className="error">

                              {

                                formErrors.clinicInfo

                              }</span>

                          )


                        } </div>

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Clinic Name</label>

                        <input className={

                          `form-control ${formErrors.clinicName && !inputData.clinicName ? "error" : ""

                          }`

                        }

                          type="text"

                          name="clinicName"

                          value={

                            inputData.clinicName

                          }

                          onChange={handleInputChange} /> {

                          formErrors.clinicName && !inputData.clinicName && (

                            <span className="error">

                              {

                                formErrors.clinicName

                              }</span>

                          )

                        } </div>

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Clinic Location</label>

                        <input className={

                          `form-control ${formErrors.location && !inputData.location ? "error" : ""

                          }`

                        }

                          type="text"

                          name="location"

                          value={

                            inputData.location

                          }

                          onChange={handleInputChange} /> {

                          formErrors.location && !inputData.location && (

                            <span className="error">

                              {

                                formErrors.location

                              }</span>

                          )

                        } </div>

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Open Time</label>

                        <input className={

                          `form-control ${formErrors.timings && !inputData.timings ? "error" : ""

                          }`

                        }

                          type="text"

                          name="timings"

                          value={

                            inputData.timings

                          }

                          onChange={handleInputChange} /> {

                          formErrors.timings && !inputData.timings && (

                            <span className="error">

                              {

                                formErrors.timings

                              }</span>

                          )

                        } </div>

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Close Time</label>

                        <input className={

                          `form-control ${formErrors.timings && !inputData.timings ? "error" : ""

                          }`

                        }

                          type="text"

                          name="timings"

                          value={

                            inputData.timings

                          }

                          onChange={handleInputChange} /> {

                          formErrors.timings && !inputData.timings && (

                            <span className="error">

                              {

                                formErrors.timings

                              }</span>

                          )

                        } </div>

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Clinic Contact Number</label>

                        <input className={

                          `form-control ${formErrors.phoneNumber && !inputData.phoneNumber ? "error" : ""

                          }`

                        }

                          type="text"

                          name="phoneNumber"

                          value={

                            inputData.phoneNumber

                          }

                          onChange={handleInputChange} /> {

                          formErrors.phoneNumber && !inputData.phoneNumber && (

                            <span className="error">

                              {

                                formErrors.phoneNumber

                              }</span>

                          )

                        } </div>

                    </div>

                    <div className="col-md-12">

                      <div className="form-group" id="desc_text">

                        <label>Description</label>

                        <textarea className="form-control" name="description"

                          value={

                            inputData.description

                          }

                          onChange={handleInputChange}></textarea>

                      </div>

                    </div>

                    <div className="col-md-6">

                      <div className="form-group">

                        <label>Status</label>

                        <select className="select" name="status"

                          value={

                            inputData.status

                          }

                          onChange={handleInputChange}>

                          <option value="PENDING" className=" border">Pending</option>

                          <option value="APPROVED" className=" border">Approved</option>



                        </select>

                      </div>

                    </div>

                  </div>

                  <div className="m-t-20 text-center">



                    <button className="btn btn-primary submit-btn" type="submit">

                      Add Clinic

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





export default AddClinic;































