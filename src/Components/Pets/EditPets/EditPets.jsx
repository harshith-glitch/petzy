import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Link } from "react-router-dom";


const EditPets = () => {
// Extracts the `petId` parameter from the URL
  const { petId } = useParams();
  
  // State variables
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Initial state for data object
  const [data, setData] = useState({
    petId: 0,
    petName: '',
    petAge: '',
    petStatus: 'Active',
    parentFName: '',
    parentLName: '',
    parentEmailId: '',
    parentPhoneNumber: '',
    state: '',
    country: '',
    city: '',
    pincode: 0,
    avatar: '',
    biography: '',
    petGender: 'male',
    breed: ''
  });
  const navigate = useNavigate();

  // Event handler for input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

// Fetches data from an API endpoint on component mount
  useEffect(() => {
    axios
      .get(`https://petservice.dev.skillassure.com/pet/pet/petid/${petId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [petId]);

  // Event handler for form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Validate form data and set form errors
    setFormErrors(validate(data));
    setIsSubmit(true);

  // Make a PUT request to update the pet data
    axios
      .put('https://petservice.dev.skillassure.com/pet/pet/pet/edit', data)
      .then((res) => {
        navigate('/pets');

        if (res.data.status === true) {
          console.log('Pet added successfully. Status: active');
        } else {
          console.log('Pet added successfully. Status: inactive');
        }

      })
      .catch((error) => {
        console.log(error);
      });

  }

  // Effect hook to log data when formErrors or isSubmit change
  useEffect(() => {
    console.log(data);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  },[formErrors]);

  // Form validation function
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.petName) {
      errors.petName = "Pet name is Required!";
    }

    if(!values.parentEmailId) {
      errors.parentEmailId ="Email is Required!";
    }else if(!regex.test(values.parentEmailId)){
      errors.parentEmailId = "Enter valid email format!";
    }

    if(!values.petAge) {
      errors.petAge ="AgeisRequired!";
    }else if (!/^\d+$/.test(values.petAge)) {
      errors.petAge = "AgeMustBeaNumber!";
    }
  

    if (!values.parentPhoneNumber) {
      errors.parentPhoneNumber = "Phone number is required!";
    } else if (!/^\d+$/.test(values.parentPhoneNumber)) {
      errors.parentPhoneNumber = "PhoneNumberMustContainOnlyNumbers!";
    } else if (values.parentPhoneNumber.length !== 10) {
      errors.parentPhoneNumber = "Phone number must be 10 characters!";
    }
  
    if(!values.parentFName) {
      errors.parentFName = "User name is Required!";
    }
    if(!values.petGender) {
      errors.petGender = "Pet Gender is Required!";
    }
    
    return errors;

  };

  return (
    <div>
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content">
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <h4 class="page-title">Edit Pets</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          First Name <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="text"
                          name="petName"
                          value={data.petName}
                          onChange={handleInputChange} />
                           <p className="text-danger">{formErrors.petName}</p>
                        
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Last Name</label>
                        <input class="form-control" type="text"
                          name="parentLName"
                          value={data.parentLName}
                          onChange={handleInputChange} />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          Username <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="text"
                          name="parentFName"
                          value={data.parentFName}
                          onChange={handleInputChange} />
                        <p className="text-danger">{formErrors.parentFName}</p>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          Email <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="email"
                          name="parentEmailId"
                          value={data.parentEmailId}
                          onChange={handleInputChange} />
                      <p className="text-danger">{formErrors.parentEmailId}</p>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Age</label>
                        <input class="form-control" type="age" name="petAge"
                        value={data.petAge}
                        onChange={handleInputChange} />
                      <p className="text-danger">{formErrors.petAge}</p>

                      </div>
                    </div>
                   
                    <div class="col-sm-6">
                      <div class="form-group gender-select">
                        <label class="gen-label">Gender:</label>
                        <div class="form-check-inline">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              name="petGender"
                              class="form-check-input"
                              value="male"
                              checked={data.petGender === 'male'}
                              onChange={handleInputChange} />
                            Male
                          </label>
                        </div>
                        <div class="form-check-inline">
                          <label class="form-check-label">
                            <input
                              type="radio"
                              name="petGender"
                              class="form-check-input"
                              value="female"
                              checked={data.petGender === 'female'}
                              onChange={handleInputChange} />
                            Female
                          </label>
                        </div>
                      <p className="text-danger">{formErrors.petGender}</p>

                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="row">
                       
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>Country</label>
                            <select class="form-control select" name="country" value={data.country} onChange={handleInputChange}>
                              <option value="USA">USA</option>
                              <option value="Umited Kingdom">United Kingdom</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>City</label>
                            <input type="text" class="form-control" 
                            name="city"
                            value={data.city}
                              onChange={handleInputChange} />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>State/Province</label>
                            <select class="form-control select" name="state" value={data.state} onChange={handleInputChange}>
                              <option value="California">California</option>
                              <option value="Alaska">Alaska</option>
                              <option value="Alabama">Alabama</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" 
                            name="pincode"
                            value={data.pincode}
                            onChange={handleInputChange}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Phone </label>
                        <input class="form-control" type="text" 
                        name="parentPhoneNumber"
                        value={data.parentPhoneNumber}
                        onChange={handleInputChange}/>
                       <p className="text-danger" required >{formErrors.parentPhoneNumber}</p>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Avatar</label>
                        <div class="profile-upload">
                          <div class="upload-img">
                            <img alt="" src="assets/img/user.jpg" />
                          </div>
                          <div class="upload-input">
                            <input type="file" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Short Biography</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      cols="30"
                      name="biography"
                      value={data.biography}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label class="display-block">Status</label>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="petStatus"
                        id="doctor_active"
                        value={true}
                        onChange={handleInputChange}
                      />
                      <label class="form-check-label" for="doctor_active">
                        Active
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="petStatus"
                        id="doctor_inactive"
                        value={false}
                        onChange={handleInputChange}
                      />
                      <label class="form-check-label" for="doctor_inactive">
                        Inactive
                      </label>
                    </div>
                  </div>
                  <div class="m-t-20 text-center">
                    <button class="btn btn-primary submit-btn">
                      Save Pets
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="notification-box">
            <div class="msg-sidebar notifications msg-noti">
              <div class="topnav-dropdown-header">
                <span>Messages</span>
              </div>
              <div class="drop-scroll msg-list-scroll" id="msg_list">
                <ul class="list-box">
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">R</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Richard Miles </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item new-message">
                        <div class="list-left">
                          <span class="avatar">J</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">John Doe</span>
                          <span class="message-time">1 Aug</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">T</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author"> Tarah Shropshire </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">M</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Mike Litorus</span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">C</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">
                            {" "}
                            Catherine Manseau{" "}
                          </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">D</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author"> Domenic Houston </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">B</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author"> Buster Wigton </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">R</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author"> Rolland Webber </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">C</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author"> Claire Mapes </span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">M</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Melita Faucher</span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">J</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Jeffery Lalor</span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">L</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Loren Gatlin</span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="chat">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">T</span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">Tarah Shropshire</span>
                          <span class="message-time">12:28 AM</span>
                          <div class="clearfix"></div>
                          <span class="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="topnav-dropdown-footer">
                <a href="chat">See all messages</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPets;
