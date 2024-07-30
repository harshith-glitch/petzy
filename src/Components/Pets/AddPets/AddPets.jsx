import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const AddPets = () => {


  const [isSubmit, setIsSubmit] = useState(false);  // Initializing a state variable 'isSubmit' using the useState hook with initial value false
  const [formErrors, setFormErrors] = useState({}); // Initializing a state variable 'formErrors' using the useState hook with initial value an empty object
  const [error, setError] = useState(false);


  // Initializing a state variable 'inputData' using the useState hook with initial values for different input fields
  const [inputData, setInputData] = useState({    
    petId: 0,
    petName: '',
    petAge: '',
    petStatus: true,
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
    petGender: '',
    breed: ''
  });

   // Event handler function for handling input changes
  const handleInputChange = (event) => { 
    const { name, value} = event.target;  // Destructuring the 'name' and 'value' properties from the target object (input element)
    let inputValue = value;
  
  if (name === 'petStatus') {
    inputValue = (value === 'true');     // Converting the string value of 'petStatus' to a boolean value
  }
    setInputData((prevState) => ({       // Updating the 'inputData' state with the new values
      ...prevState,
      [name]: inputValue
    }));
  };
  // const navigate = useNavigate();   // Initializing the useNavigate hook for navigation

 // Event handler function for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();       // Preventing the default form submission behavior

    setFormErrors(validate(inputData));  // Validating the form input data and setting the form errors
    setIsSubmit(true); // Setting the 'isSubmit' state to true
  try{
   const {data} = await axios
      .post('https://petservice.dev.skillassure.com/pet/pet/addpet', inputData); // Making a POST request to the specified API endpoint with the input data
      // .then((res) => {
      //  navigate('/pets') // Navigating to the '/pets' route upon successful submission
      window.location.href='/pets'

      // })
  }
      catch(err) {
         console.log(err);
         setError(true)}; // Handling any errors that occur during the request

      
  };

  useEffect(() => {
    console.log(inputData);      // Logging the 'inputData' state value when it changes
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(inputData);   // Logging the 'inputData' state value if there are no form errors and the form has been submitted

    }
  },[formErrors]);


// Function for validating the form input values and returning any validation errors
  const validate = (values) => {
    const errors = {};                          // Initializing an empty object for storing the validation errors
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;     // Regular expression for email validation
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
      errors.parentPhoneNumber = "Phone Number Must Contain Only Numbers!";
    } else if (values.parentPhoneNumber.length !== 10) {
      errors.parentPhoneNumber = "Phone number must be 10 characters!";
    }
  
    if(!values.parentFName) {
      errors.parentFName = "User name is Required!";
    }
    if(!values.petGender) {
      errors.petGender = "Pet Gender is Required!";
    }
    return errors;             // Returning the validation errors object

  };


  return (
    <div>
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content">
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <h4 class="page-title">Add Pets</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <form 
                onSubmit={handleSubmit}
                >
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          First Name <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="text" name="petName" data-testid="vinay"
                            value={inputData.petName}
                            onChange={handleInputChange} />
                           <p className="text-danger">{formErrors.petName}</p>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Last Name</label>
                        <input class="form-control" type="text" name="parentLName" data-testid="last"
                         value={inputData.parentLName}
                         onChange={handleInputChange}></input>
                       
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          Username <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="text" name="parentFName" data-testid="petuser"
                      value={inputData.parentFName}
                      onChange={handleInputChange}
                        />
                        <p className="text-danger">{formErrors.parentFName}</p>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>
                          Email <span class="text-danger">*</span>
                        </label>
                        <input class="form-control" type="email" name="parentEmailId" data-testid="petemail"
                        value={inputData.parentEmailId}
                        onChange={handleInputChange}
                        ></input>
                   <p className="text-danger" data-testid="error" style= {{ visibility: error ? "visible" : "hidden"}}>Email is required</p>
                        
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Age</label>
                        <input class="form-control" type="age" name="petAge" data-testid="petAge"
                        value={inputData.petAge}
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
                              checked={inputData.petGender === 'male'}
                              onChange={handleInputChange}  
                              data-testid="petgender"
                            />
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
                              checked={inputData.petGender === 'female'}
                              onChange={handleInputChange}
                              data-testid="petgender"
                            />
                            Female
                          </label>
                        </div>
                      <p className="text-danger">{formErrors.petGender}</p>

                      </div>

                    </div>
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" data-testid="petadress"/>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>Country</label>
                            <select class="form-control select" name="country" value={inputData.country} onChange={handleInputChange}  data-testid="petcountry">
                              <option value="USA">USA</option>
                              <option value="United Kingdom">United Kingdom</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>City</label>
                            <input type="text" class="form-control" name="city" data-testid="petcity"
                           value={inputData.city} 
                           onChange={handleInputChange}/>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>State/Province</label>
                            <select class="form-control select" name="state" value={inputData.state} onChange={handleInputChange} data-testid="petstate">
                              <option value="California">California</option>
                              <option value="Alaska">Alaska</option>
                              <option value="Alabama">Alabama</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-3">
                          <div class="form-group">
                            <label>Postal Code</label>
                            <input type="text" class="form-control" name="pincode" data-testid="petpincode"
                          value={inputData.pincode}
                          onChange={handleInputChange}
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Phone </label>
                        <input class="form-control" type="text" name="parentPhoneNumber" data-testid="petphonenumber"
                       value={inputData.parentPhoneNumber}
                       onChange={handleInputChange}
                       ></input>
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
                      value={inputData.biography}
                      onChange={handleInputChange}
                      data-testid="petbiography"
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
                        value="true"
                        checked={inputData.petStatus.toString()}
                        onChange={handleInputChange}
                        data-testid="petStatus"
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
                        value="false"
                        checked={inputData.petStatus.toString()}
                        onChange={handleInputChange}
                        data-testid="petStatus"
                      />
                      <label class="form-check-label" for="doctor_inactive">
                        Inactive
                      </label>
                    </div>
                  </div>
                  <div class="m-t-20 text-center">
                  {/* <Link to="/pets"> */}
                    <button  type="submit" class="btn btn-primary submit-btn">
                      Create Pets
                    </button>
                    {/* </Link>   */}
                    
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

export default AddPets;
