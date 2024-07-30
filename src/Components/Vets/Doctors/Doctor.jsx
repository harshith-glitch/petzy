



import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import Pagination from "react-js-pagination";




const Doctor = () => {

  const [data, setData] = useState([]);

  const [activePage, setActivePage] = useState(1);

  const itemsPerPage = 8;




  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);




  useEffect(() => {

    axios

      .get("https://vetservice.dev.skillassure.com/vet/vet/view/vets")

      .then((response) => {

        const sortedDoctors = response.data.sort((a, b) => a.npiNo - b.npiNo);

        setDoctors(sortedDoctors);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);




  const handlePageChange = (pageNumber) => {

    setActivePage(pageNumber);

  };




  const onDelete = (npiNo) => {

    axios

      .delete(`https://vetservice.dev.skillassure.com/vet/vet/vet/deleteVetById/${npiNo}`)

      .then(() => {

        setDoctors((prevDoctors) => {

          const updatedDoctors = prevDoctors.filter((doctor) => doctor.npiNo !== npiNo);

          const sortedDoctors = updatedDoctors.sort((a, b) => a.npiNo - b.npiNo);

          return sortedDoctors;

        });

      })

      .catch((error) => {

        console.error(error);

      });

  };




  const handleDeleteModalOpen = (doctor) => {

    setSelectedDoctor(doctor);

  };




  const handleDeleteModalClose = () => {

    setSelectedDoctor(null);

  };




  const renderClinics = () => {

    const startIndex = (activePage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const clinicsToShow = doctors.slice(startIndex, endIndex);




    return (

      <div className="main-wrapper">

        <div className="page-wrapper">

          <div className="content">

            <div className="row">

              <div className="col-sm-4 col-3">

                <h4 className="page-title">Vets</h4>

              </div>

              <div className="col-sm-8 col-9 text-right m-b-20">

                <Link to="/adddoctor" className="btn btn-primary btn-rounded float-right">

                  <i className="fa fa-plus"></i> Add Vets

                </Link>

              </div>

            </div>

            <div className="row doctor-grid">

              {clinicsToShow.map((doctor) => (

                <div className="col-md-4 col-sm-4 col-lg-3" key={doctor.npiNo}>

                  <div className="profile-widget">

                    <div className="doctor-img">

                      <a className="avatar">

                        <img alt="" src="assets/img/doctor-thumb-03.jpg" />

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

                      <div className="dropdown-menu dropdown-menu-right">

                        <Link to={`/editdoctor/${doctor.npiNo}`}>

                          <a href="editdoctor" className="dropdown-item">

                            <i className="fa fa-pencil m-r-5"></i> Edit

                          </a>

                        </Link>

                        <a

                          className="dropdown-item"

                          href="#"

                          data-toggle="modal"

                          data-target="#delete_doctor"

                          onClick={() => handleDeleteModalOpen(doctor)}

                        >

                          <i className="fa fa-trash-o m-r-5"></i> Delete

                        </a>

                      </div>

                    </div>

                    <h4 className="doctor-name text-ellipsis">

                      <a>

                        {doctor.firstName} {doctor.lastName}

                      </a>

                    </h4>

                    <div className="doc-prof">{doctor.department}</div>

                    <div className="user-country">

                      <i className="fa fa-map-marker"></i> {doctor.city} {doctor.state}

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="row">

              <div className="col-md-12 d-flex justify-content-center">

                <div className="pagination-container mt-5">

                  <Pagination

                    activePage={activePage}

                    itemsCountPerPage={itemsPerPage}

                    totalItemsCount={doctors.length}

                    pageRangeDisplayed={5}

                    onChange={handlePageChange}

                    itemClass="page-item"

                    linkClass="page-link"

                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {selectedDoctor && (

          <div

            id="delete_doctor"

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

                  <h3>Are you sure want to delete this Vet?</h3>

                  <div className="m-t-20">

                    <a

                      href="#"

                      className="btn btn-white mr-2"

                      data-dismiss="modal"

                      onClick={handleDeleteModalClose}

                    >

                      Close

                    </a>

                    <button

                      type="submit"

                      className="btn btn-danger"

                      data-dismiss="modal"

                      onClick={() => onDelete(selectedDoctor.npiNo)}

                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    );

  };




  return <>{renderClinics()}</>;

};




export default Doctor;