import React, { useState, useEffect } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editclinic.css";

const EditClinic = () => {
  const { clinicName } = useParams();
  const navigate = useNavigate();

  // State to hold the form data
  const [data, setData] = useState({
    clinicInfo: "",
    clinicId: 0,
    clinicName: "",
    location: "",
    phoneNumber: "",
    timings: "",
    description: "",
    status: "PENDING",
  });

  // Fetch initial data and load stored data from localStorage
  useEffect(() => {
    const storedClinicInfo = localStorage.getItem("clinicInfo");
    const storedClinicName = localStorage.getItem("clinicName");
    const storedLocation = localStorage.getItem("location");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedTimings = localStorage.getItem("timings");
    const storedDescription = localStorage.getItem("description");
    const storedStatus = localStorage.getItem("status");

    if (
      storedClinicInfo &&
      storedClinicName &&
      storedLocation &&
      storedPhoneNumber &&
      storedTimings &&
      storedDescription &&
      storedStatus
    ) {
      // Set the stored data to the state
      setData((prevState) => ({
        ...prevState,
        clinicInfo: storedClinicInfo,
        clinicName: storedClinicName,
        location: storedLocation,
        phoneNumber: storedPhoneNumber,
        timings: storedTimings,
        description: storedDescription,
        status: storedStatus,
      }));
    }

    // Fetch data from the API
    axios
      .get(
        `https://clinicservice.dev.skillassure.com/clinic/clinics/clinic/get/name/${clinicName}`
      )
      .then((res) => {
        // Set the fetched data to the state
        const { clinicId, status, ...rest } = res.data;
        setData((prevState) => ({
          ...prevState,
          clinicId,
          status,
          ...rest,
        }));
      })
      .catch((err) => console.log(err));
  }, [clinicName]);

  // Handle form submission
 
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Send the updated data to the API
    axios
      .put(
        `https://clinicservice.dev.skillassure.com/clinic/clinics/clinic/update`,
        data
      )
      .then((response) => {
        // Navigate to the clinic page after successful update
        navigate("/clinic");
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error updating clinic:", error);
      });
  };
  
  // Handle input change in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Edit Clinic</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Clinic Info</label>
                        <input
                          className="form-control"
                          type="text"
                          name="clinicInfo"
                          value={data.clinicInfo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Clinic Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="clinicName"
                          value={data.clinicName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Clinic Location</label>
                        <input
                          className="form-control"
                          type="text"
                          name="location"
                          value={data.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Open Time</label>
                        <input
                          className="form-control"
                          type="text"
                          name="timings"
                          value={data.timings}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Close Time</label>
                        <input
                          className="form-control"
                          type="text"
                          name="closeTime"
                          value={data.closeTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Clinic Contact Number</label>
                        <input
                          className="form-control"
                          type="text"
                          name="phoneNumber"
                          value={data.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group" id="desc_text">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={data.description}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Status</label>
                        <select
                          className="select"
                          name="status"
                          value={data.status}
                          onChange={handleInputChange}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="APPROVED">Approved</option>
                        
                        
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                      >
                        Update Clinic
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

export default EditClinic;
