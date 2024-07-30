import React from "react";


import {Link, useParams} from "react-router-dom";


import {useEffect, useState} from "react";


import {useNavigate} from "react-router-dom";


import axios from "axios";


const EditDoctor = () => {


    const navigate = useNavigate()


    // Get the 'npiNo' parameter from the URL


    const {npiNo} = useParams();


    // State variable to store the form data


    const [data, setData] = useState({


        // Initial values for the form fields


        npiNo: "",


        userName: "",


        firstName: "",


        lastName: "",


        avatar: "",


        department: "",


        dob: "",


        email: "",


        gender: "",


        clinic: "",


        address: "",


        state: "",


        mobileNo: 0,


        city: "",


        country: "",


        shortBiography: "",


        status: true,


        departmentId: ""


    });


    useEffect(() => { // Fetch the doctor data with the specified 'npiNo' when the component mounts


        axios.get(`https://vetservice.dev.skillassure.com/vet/vet/vet/getById/${npiNo}`).then((res) => {


            setData(res.data);


        }).catch((err) => console.log(err));


    }, [npiNo]);


    const handleSubmit = (event) => {


        event.preventDefault();


        // Send a put request to update the doctor details


        axios.put('https://vetservice.dev.skillassure.com/vet/vet/vet/editVetDetails', data).then(() => { // Handle successful update


            navigate("/vet")


        }).catch((error) => {


            console.error("Error updating vet:", error);


        });


    };


    const handleInputChange = (event) => {


        const {name, value} = event.target;


        setData((prevState) => ({


            ...prevState,


            [name]: value


        }));


    };


    return (


        <div>


            <div className="main-wrapper">


                <app-menu></app-menu>


                <div className="page-wrapper">


                    <div className="content">


                        <div className="row">


                            <div className="col-lg-8 offset-lg-2">


                                <h4 className="page-title">Edit Vets</h4>
                                {/* Displays the page title */} </div>


                        </div>


                        <div className="row">


                            <div className="col-lg-8 offset-lg-2">


                                <form onSubmit={handleSubmit}>
                                    {/* Form for editing vet details */}


                                    <div className="row">


                                        <div className="col-sm-6">


                                            <div className="form-group">


                                                <label>


                                                    First Name
                                                    <span className="text-danger">*</span>


                                                </label>


                                                <input className="form-control" type="text" name="firstName"


                                                    // Binds the value to the data.firstName


                                                    value={
                                                        data.firstName
                                                    }


                                                    // Calls the handleInputChange function on input change


                                                    onChange={handleInputChange}/>


                                            </div>


                                        </div>


                                        <div className="col-sm-6">


                                            <div className="form-group">


                                                <label>Last Name</label>


                                                <input className="form-control" type="text" name="lastName"


                                                    value={
                                                        data.lastName
                                                    }


                                                    onChange={handleInputChange}/>


                                            </div>


                                        </div>


                                        <div className="col-sm-6">


                                            <div className="form-group">


                                                <label>


                                                    Specialist
                                                    <span className="text-danger">*</span>


                                                </label>


                                                <input className="form-control" type="text" name="department"


                                                    value={
                                                        data.department
                                                    }


                                                    onChange={handleInputChange}/>


                                            </div>


                                        </div>


                                        <div className="col-sm-6">


                                            <div className="form-group gender-select">


                                                <label className="gen-label">Gender:</label>


                                                <div className="form-check-inline">


                                                    <label className="form-check-label">


                                                        <input type="radio" name="gender" className="form-check-input" value="male"


                                                            // Sets the checked state based on the data.gender value


                                                            checked={
                                                                data.gender === "male"
                                                            }


                                                            onChange={handleInputChange}/>


                                                        Male


                                                    </label>


                                                </div>


                                                <div className="form-check-inline">


                                                    <label className="form-check-label">


                                                        <input type="radio" name="gender" className="form-check-input" value="female"


                                                            checked={
                                                                data.gender === "female"
                                                            }


                                                            onChange={handleInputChange}/>


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


                                                        <input type="text" className="form-control" name="address"


                                                            value={
                                                                data.address
                                                            }


                                                            onChange={handleInputChange}/>


                                                    </div>


                                                </div>


                                            </div>


                                        </div>


                                        <div className="col-sm-6">


                                            <div className="form-group">


                                                <label>Phone</label>


                                                <input className="form-control" type="text" name="mobileNo"


                                                    value={
                                                        data.mobileNo
                                                    }


                                                    onChange={handleInputChange}/>


                                            </div>


                                        </div>


                                        <div className="col-sm-6">


                                            <div className="form-group">


                                                <label>Avatar</label>


                                                <div className="profile-upload">


                                                    <div className="upload-img">


                                                        <img alt="" src="assets/img/user.jpg"/>


                                                    </div>


                                                    <div className="upload-input">


                                                        <input type="file" className="form-control"/>


                                                    </div>


                                                </div>


                                            </div>


                                        </div>


                                    </div>
                                    <div className="row">

                                        <div className="col-sm-6">

                                            <div className="form-group">

                                                <label>City</label>

                                                <input className="form-control" type="text" name="city"

                                                    value={
                                                        data.city
                                                    }

                                                    onChange={handleInputChange}/>

                                            </div>

                                        </div>

                                        <div className="col-sm-6">

                                            <div className="form-group">

                                                <label>State</label>

                                                <input className="form-control" type="text" name="state"

                                                    value={
                                                        data.state
                                                    }

                                                    onChange={handleInputChange}/>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">


                                        <label>Short Biography</label>


                                        <textarea className="form-control" rows="3" cols="30" name="shortBiography"


                                            value={
                                                data.shortBiography
                                            }


                                            onChange={handleInputChange}></textarea>


                                    </div>


                                    <div className="form-group">


                                        <label className="display-block">Status</label>


                                        <div className="form-check form-check-inline">


                                            <input className="form-check-input" type="radio" name="status" id="doctor_active" value="true"


                                                checked={
                                                    data.status === true
                                                }


                                                onChange={handleInputChange}/>


                                            <label className="form-check-label" htmlFor="doctor_active">


                                                Active


                                            </label>


                                        </div>


                                        <div className="form-check form-check-inline">


                                            <input className="form-check-input" type="radio" name="status" id="doctor_inactive" value="false"


                                                checked={
                                                    data.status === false
                                                }


                                                onChange={handleInputChange}/>


                                            <label className="form-check-label" htmlFor="doctor_inactive">


                                                Inactive


                                            </label>


                                        </div>


                                    </div>


                                    <div className="m-t-20 text-center">


                                        <button className="btn btn-primary submit-btn">


                                            Save Vet


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


export default EditDoctor;
