import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  './clinicinformation.css'
import Pagination from "react-js-pagination";

const ClinicInformation = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://clinicservice.dev.skillassure.com/clinic/clinics/clinic/get/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const onDelete = (clinicId) => {
    axios
      .delete(`https://clinicservice.dev.skillassure.com/clinic/clinics/clinic/${clinicId}/remove`)
      .then(() => {
        const updatedData = data.filter((clinic) => clinic.clinicId !== clinicId);
        setData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeModal(clinicId);
      });
  };

  const closeModal = (clinicId) => {
    const modalId = `#delete_clinic_${clinicId}`;
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };

  const renderClinics = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const clinicsToShow = data.slice(startIndex, endIndex);

    return clinicsToShow.map((clinic) => (
      <tr key={clinic.id}>
        <td>{clinic.clinicInfo}</td>
        <td>{clinic.clinicName}</td>
        <td>{clinic.location}</td>
        <td>{clinic.timings}</td>
        <td>{clinic.phoneNumber}</td>
        
        <td className={`custom-badge ${clinic.status === 'PENDING' ? 'status-red' : 'status-green'}`}>{clinic.status}</td>
        <td className="text-right">
          <div className="dropdown dropdown-action">
            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown">
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to={`/editclinic/${clinic.clinicName}`} className="dropdown-item">
                <i className="fa fa-pencil m-r-5"></i> Edit
              </Link>s
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target={`#delete_clinic_${clinic.clinicId}`}
              >
                <i className="fa fa-trash-o m-r-5"></i> Delete
              </a>
            </div>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-sm-8 col-6">
                <h4 className="page-title">Clinic Information</h4>
              </div>
              <div className="col-lg-4 col-6 text-right m-b-30">
                <Link to="/addClinic" className="btn btn-primary btn-rounded float-right">
                  <i className="fa fa-plus"></i> Add Clinic
                </Link>
              </div>
            </div>
            <div className="row filter-row">{/* Filter options */}</div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table mb-0 datatable">
                    <thead>
                      <tr>
                        <th>Clinic Info</th>
                        <th>Clinic Name</th>
                        <th>Clinic Location</th>
                        <th>Timings</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderClinics()}</tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <div className="pagination-container mt-5">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={data.length}
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
      </div>

      {data.map((clinic) => (
        <div
          key={clinic.clinicId}
          id={`delete_clinic_${clinic.clinicId}`}
          className="modal fade delete-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteClinicModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                <h3>Are you sure you want to delete this Clinic?</h3>
                <div className="m-t-20">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-dismiss="modal"
                    onClick={() => closeModal(clinic.clinicId)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => onDelete(clinic.clinicId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicInformation;
