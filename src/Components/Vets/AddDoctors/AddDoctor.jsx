

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputData, setInputData] = useState({
    npiNo: 0,
    firstName: "",
    lastName: "",
    department: "",
    gender: "",
    address: "",
    mobileNo: "",
    avatar: "",
    shortBiography: "",
    status: true,
    city: "",
    state: "",
  });

  const handleInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    axios
      .post("https://vetservice.dev.skillassure.com/vet/vet/vet/add", inputData)
      .then((response) => {
        console.log("Success:", response.data);
        navigate("/vet");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="main-wrapper">
      <app-menu></app-menu>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h4 className="page-title">Add Vets</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        First Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={inputData.firstName}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.firstName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Last Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={inputData.lastName}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.lastName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Department
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="department"
                        value={inputData.department}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.department && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group gender-select">
                      <label className="gen-label">Gender:</label>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="gender"
                            className="form-check-input"
                            value="male"
                            checked={inputData.gender === "male"}
                            onChange={handleInputChange}
                            required
                            
                          />
                          Male
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="gender"
                            className="form-check-input"
                            value="female"
                            checked={inputData.gender === "female"}
                            onChange={handleInputChange}
                            required
                            
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={inputData.address}
                            onChange={handleInputChange}
                            required
                            
                          />
                          {errors.address && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mobileNo"
                        value={inputData.mobileNo}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.mobileNo && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Avatar</label>
                      <div className="profile-upload">
                        <div className="upload-img">
                          <img
                            src="assets/img/user.jpg"
                            alt=""
                            className="img-circle"
                          />
                        </div>
                        <div className="upload-input">
                          <input
                            type="file"
                            className="form-control"
                            name="avatar"
                            onChange={handleInputChange}
                            
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        City
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="city"
                        value={inputData.city}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.city && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        State
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="state"
                        value={inputData.state}
                        onChange={handleInputChange}
                        required
                        
                      />
                      {errors.state && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Short Biography</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="shortBiography"
                    value={inputData.shortBiography}
                    onChange={handleInputChange}
                    
                  ></textarea>
                  {errors.shortBiography && (
                    <span className="text-danger">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="display-block">Status</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="doctor_active"
                      value="option1"
                      checked={inputData.status}
                      onChange={handleInputChange}
                      required
                      
                    />
                    <label className="form-check-label" htmlFor="doctor_active">
                      Active
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="doctor_inactive"
                      value="option2"
                      checked={!inputData.status}
                      onChange={handleInputChange}
                      
                    />
                    <label
                      className="form-check-label"
                      htmlFor="doctor_inactive"
                    >
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="m-t-20 text-center">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Create Vet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
