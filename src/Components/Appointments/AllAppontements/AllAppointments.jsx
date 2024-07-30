import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";




const AllAppointments = () => {

  const [appointments, setAppointments] = useState([]);




  useEffect(() => {

    // Fetch appointments data

    axios

      .get(

        "https://appointmentservice.dev.skillassure.com/appointment/appointment/viewAllAppointments"

      )

      .then((response) => {

        setAppointments(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);




  const handleDelete = (appointmentId) => {

    // Remove appointment from the list

    const updatedAppointments = appointments.filter(

      (appointment) => appointment.appointmentId !== appointmentId

    );

    setAppointments(updatedAppointments);




    // Delete appointment from the server

    axios

      .delete(

        `https://appointmentservice.dev.skillassure.com/appointment/appointment/removeAppointmentById/${appointmentId}`

      )

      .then((response) => {

        // Display success message if needed

        console.log("Appointment deleted successfully");

      })

      .catch((error) => {

        // Handle error if needed

        console.log(error);

      });

  };




  return (

    <div className="main-wrapper">

      <div className="page-wrapper">

        <div className="content">

          <div className="row">

            <div className="col-sm-4 col-3">

              <h4 className="page-title">Appointments</h4>

            </div>

            <div className="col-sm-8 col-9 text-right m-b-20">

              <a

                href="addappointment"

                className="btn btn-primary btn-rounded float-right text-light"

              >

                <i className="fa fa-plus"></i> Add Appointments

              </a>

            </div>

            <div className="col-sm-12 text-right m-b-20">

              <a className="btn btn-secondary btn-rounded float-right text-light" href="/listappointments">

                List View

              </a>

              <a className="btn btn-secondary btn-rounded float-right text-light">

                Card View

              </a>

            </div>

          </div>





          <div className="row doctor-grid">

            {appointments.map((appointment) => (

              <div

                className="col-md-4 col-sm-4 col-lg-3"

                key={appointment.appointmentId}

              >

                <div className="profile-widget">

                  <div className="doctor-img">

                    <a className="avatar">

                      <img

                        alt=""

                        src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=740&t=st=1686738806~exp=1686739406~hmac=36550220b43666e4217ac057d00670b29194a3e429e66679310a259009a0efa4"

                      />

                    </a>

                  </div>

                  <div className="dropdown profile-action">

                    <a

                      href="#"

                      className="action-icon dropdown-toggle"

                      data-toggle="dropdown"

                      aria-expanded="false"

                    >

                      <i className="fa fa-ellipsis-v"></i>

                    </a>

                    <ul className="dropdown-menu dropdown-menu-right">

                      <li>

                        <a className="dropdown-item">

                          <Link to={`/editappointment/${appointments.id}`}>

                            <i className="fa fa-pencil m-r-5"></i> Edit

                          </Link>

                        </a>




                      </li>

                      <li>

                        <a

                          className="dropdown-item"

                          href="#"

                          data-toggle="modal"

                          data-target="#delete_appointment"

                          onClick={() =>

                            handleDelete(appointment.appointmentId)




                          }

                          data-testid="Delete"

                        >

                          <i className="fa fa-trash-o m-r-5"></i> Delete

                        </a>

                      </li>

                    </ul>

                  </div>

                  <h4 className="doctor-name text-ellipsis">

                    <a>{appointment.petName}</a>

                  </h4>

                  <h6 className="doctor-name text-ellipsis">

                    <a>{appointment.deptName}</a>

                  </h6>

                  <div className="user-country">

                    <i className="fa fa-map-marker"></i>{" "}

                    {appointment.location}

                    {appointment.city},{appointment.state}

                  </div>

                </div>

              </div>

            ))}

          </div>

          <div className="row">

            <div className="col-sm-12">

              <div className="see-all">

                <a className="see-all-btn" href="javascript:void(0);">

                  Load More

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div

        id="delete_appointment"

        className="modal fade delete-modal"

        role="dialog"

      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-body text-center">

              <img

                src="assets/img/sent.png"

                alt=""

                width="50"

                height="46"

              />

              <h3>Are you sure you want to delete this appointment?</h3>

              <div className="m-t-20">

                <a

                  href="#"

                  className="btn btn-white"

                  data-dismiss="modal"

                >

                  Close

                </a>

                <a

                  href="#"

                  className="btn btn-white"

                  data-dismiss="modal"

                >

                  <button type="submit" className="btn btn-danger">

                    Delete

                  </button>

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};




export default AllAppointments;