import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddAppointment = () => {
  const [inputData, setInputData] = useState({
    appointmentId: 0,
    petName: "",
    vetName: "",
    deptName: "",
    date: "",
    time: "",
    parentEmailId: "",
    parentPhoneNumber: "",
    moreDetails: "",
    appointmentStatus: "",
    gender: "",

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
      const payload = {
        ...inputData,
        appointmentStatus: "APPROVED",
        gender: "MALE",
      };
      axios
        .post(
          "https://appointmentservice.dev.skillassure.com/appointment/appointment/addappointment",
          payload

        )
        .then((res) => {
          navigate("/listappointments");
        })
        .catch((err) => console.log(err));
    }
  };


  const validate = (values) => {

    const errors = {};

    const requiredFields = [
      "appointmentId",
      "petName",
      "vetName",
      "deptName",
      "date",
      "time",
      "parentEmailId",
      "parentPhoneNumber",
      "moreDetails",
      "appointmentStatus",
      "gender",
    ];
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`;
      }
    });
    return errors;
  };


  return (
    <div>
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content">
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <h4 class="page-title">Add Appointment</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <form
                  onSubmit={handleSubmit}
                >
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Appointment ID</label>
                        <input className={
                          `form-control ${formErrors.appointmentId && !inputData.appointmentId ? "error" : ""
                          }`
                        }
                          type="text"
                          data-testid="appointmentId"
                          name="appointmentId"
                          value={
                            inputData.appointmentId
                          }
                          onChange={handleInputChange}
                        />
                        {
                          formErrors.appointmentId && !inputData.appointmentId && (
                            <span className=" error">
                              {
                                formErrors.appointmentId
                              }
                            </span>
                          )
                        }
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Name</label>
                        <input
                          className={
                            `form-control ${formErrors.petName && !inputData.petName ? "errors" : ""
                            }`
                          }
                          type="text"
                          name="petName"
                          value={inputData.petName}
                          onChange={handleInputChange}
                        />
                        {

                          formErrors.petName && !inputData.petName && (

                            <span className="error">

                              {

                                formErrors.petName

                              }</span>

                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Department</label>
                        <input
                          class={`form-control ${formErrors.deptName && !inputData.deptName ? "error" : ""

                            }`
                          }
                          type="text"
                          name="deptName"
                          value={inputData.deptName}
                          onChange={handleInputChange}
                        />
                        {
                          formErrors.deptName && !inputData.deptName && (

                            <span className="error">

                              {

                                formErrors.deptName

                              }</span>

                          )

                        }
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Vet</label>
                        <input
                          className={
                            `form-control ${formErrors.vetName && !inputData.vetName ? "error" : ""

                            }`
                          }
                          type="text"
                          name="vetName"
                          value={inputData.vetName}
                          onChange={handleInputChange}
                        />
                        {

                          formErrors.vetName && !inputData.vetName && (

                            <span className="error">

                              {

                                formErrors.vetName

                              }</span>

                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Date</label>
                        <div class="cal-icon">
                          <input
                            type="text"
                            className={
                              `form-control ${formErrors.date && !inputData.date ? "error" : ""

                              }`
                            }
                            name="date"
                            value={inputData.date}
                            onChange={handleInputChange}
                          />
                          {
                            formErrors.date && !inputData.date && (
                              <span className="error">
                                {
                                  formErrors.date
                                }
                              </span>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Time</label>
                        <div class="time-icon">
                          <input
                            type="text"
                            class={
                              `form-control ${formErrors.time && !inputData.time ? "error" : ""

                              }`
                            }
                            id="datetimepicker3"
                            name="time"
                            value={inputData.time}
                            onChange={handleInputChange}
                          />
                          {
                            formErrors.time && !inputData.time && (

                              <span className="error">

                                {

                                  formErrors.time

                                }</span>

                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Email</label>
                        <input className={

                          `form-control ${formErrors.parentEmailId && !inputData.parentEmailId ? "error" : ""
                          }`
                        }
                          type="email"
                          name="parentEmailId"
                          value={
                            inputData.parentEmailId
                          }
                          onChange={handleInputChange}
                        />
                        {
                          <span className="error">
                            {
                              formErrors.parentEmailId
                            }
                          </span>
                        }
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Phone Number</label>
                        <input class=
                          {
                            `form-control ${formErrors.parentPhoneNumber && !inputData.parentPhoneNumber ? "error" : ""}`
                          }
                          type="text"
                          name="parentPhoneNumber"
                          value={inputData.parentPhoneNumber}
                          onChange={handleInputChange} />
                        {
                          formErrors.parentPhoneNumber && !inputData.parentPhoneNumber && (
                            <span className="error">
                              {
                                formErrors.parentPhoneNumber
                              }
                            </span>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Message</label>
                    <textarea
                      cols="30"
                      rows="4"
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label class="display-block">Appointment Status</label>
                    <div class="form-check form-check-inline">
                      <input
                        class='form-check-input'

                        type="radio"
                        name="status"
                        id="product_active"
                        value={inputData.appointmentStatus}
                        onChange={handleInputChange}
                        checked
                      />


                      <label class="form-check-label" for="product_active">
                        Active
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="status"
                        id="product_inactive"
                        value="option2"
                      />
                      <label class="form-check-label" for="product_inactive">
                        Inactive
                      </label>
                    </div>
                  </div>
                  {/* {
                        formErrors.appointmentStatus && !inputData.appointmentStatus &&(
                          <span className="error">
                            {
                              formErrors.appointmentStatus
                            }
                          </span>
                        )
                      } */}
                  <div class="m-t-20 text-center">

                    <button class="btn btn-primary submit-btn" href="/allappointments" type="submit">
                      Create Appointment
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

export default AddAppointment;




