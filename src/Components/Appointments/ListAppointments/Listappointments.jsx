import React, { useEffect, useState } from "react";
import axios from "axios";

const Listappointments = () => {
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
              <a className="btn btn-secondary btn-rounded float-right text-light">
                List View
              </a>
              <a className="btn btn-secondary btn-rounded float-right text-light" href="/allappointments">
                Card View
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="table-responsive table-container " style={{width:"104%"}}>
                <table className="table table-striped custom-table" style={{width:"100%",marginLeft:"-0.5%"}}>
                  <thead>
                    <tr>
                      <th>Appointment ID</th>
                      <th>Pet Name</th>
                      <th>Age</th>
                      <th>Doctor Name</th>
                      <th>Department</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.appointmentId}>
                        <td>{appointment.appointmentId}</td>
                        <td>{appointment.petName}</td>
                        <td>{appointment.parentPhoneNumber}</td>
                        <td>{appointment.vetName}</td>
                        <td>{appointment.deptName}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.appointmentStatus}</td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
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
                                  <i className="fa fa-pencil m-r-5"></i> Edit
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
                                >
                                  <i className="fa fa-trash-o m-r-5"></i>{" "}
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

export default Listappointments;
