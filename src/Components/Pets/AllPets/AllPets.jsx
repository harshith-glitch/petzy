import React from "react";
import './allpets.css';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const AllPets = () => {
  // Initializing a state variable 'apiData' using the useState hook with initial value an empty array
  const [apiData, setApiData] = useState([]);


  const [currentPage, setCurrentPage] = useState(1) // Initializing a state variable 'currentPage' using the useState hook with initial value 1
  const recordsPerPage = 8; // Setting the number of records to display per page
  const lastIndex = currentPage * recordsPerPage;  // Calculating the index of the last record to display
  const firstIndex = lastIndex - recordsPerPage;  // Calculating the index of the first record to display
  const records = apiData.slice(firstIndex, lastIndex);  // Extracting the records to display based on the current page
  const npage = Math.ceil(apiData.length / recordsPerPage)  // Calculating the total number of pages
  const numbers = [...Array(npage + 1).keys()].slice(1)  // Creating an array of page numbers to display in pagination


  useEffect(() => {
    getData();  // Calling the getData function when the component mounts
  }, []);

  const getData = async() => {
    try{
   const {data} = await axios.get('https://petservice.dev.skillassure.com/pet/pet/getallpets') // Making a GET request to the specified API endpoint
      // .then(response => {
        setApiData(data); // Updating the 'apiData' state with the response data
      // })
    }
      catch(error)  {
        console.log(error);
      // });
      }
  }


  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1) // Decreasing the current page number by 1 if it's not the first page
    }
  }
  function changeCPage(petId) {
    setCurrentPage(petId) // Setting the current page to the selected page number
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1) // Increasing the current page number by 1 if it's not the last page
    }
  }

  // Making a DELETE request to delete a specific pet based on the petId
  const onDelete = (petId) => {
    axios

      .delete(
        `https://petservice.dev.skillassure.com/pet/pet/delete/${petId}`
      )

      .then((response) => {
        getData(response.data) // Calling the getData function to refresh the data after successful deletion

      })
      .catch((error) => {
        console.error(error); // Logging any errors that occur during the request

      })
  };


  return (
    <div>
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content">
            <div class="row">
              <div class="col-sm-4 col-3">
                <h4 class="page-title">Pets</h4>
              </div>
              <div class="col-sm-8 col-9 text-right m-b-20">
                <a
                  href="/addPets"
                  class="btn btn-primary btn-rounded float-right text-light"
                  data-testid="addpets"
                >
                  <i class="fa fa-plus" data-testid="checkaddpets"></i> Add Pets
                </a>
              </div>
              <div class="col-sm-12 text-right m-b-20">
                <Link to="/listviewpets"  data-testid="lisviewpets">
                  <a
                    class="btn btn-secondary btn-rounded float-right text-light"
                    onclick="lists()"
                   
                  >
                    List View
                  </a>
                </Link>
                <Link to="/pets">
                  <a
                    class="btn btn-secondary btn-rounded float-right text-light"
                    onclick="cards()"
                  >
                    Card View
                  </a>
                </Link>
              </div>
            </div>


            <div class="row doctor-grid">
              {records.map((event) => (

                <div class="col-md-4 col-sm-4 col-lg-3">

                  <div class="profile-widget">

                    <div class="doctor-img">
                      <a class="avatar" href="#">
                        <img alt="" src="assets/img/patient4.jpg" />
                      </a>
                    </div>
                    <div class="dropdown profile-action">
                      <a
                        href="#"
                        class="action-icon dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa fa-ellipsis-v"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <Link to={`/editpets/${event.petId}`}>
                          <a class="dropdown-item" href="editpets">
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </a>
                        </Link>
                        <a

                          class="dropdown-item"
                          href="#"
                          data-toggle="modal"
                          data-target={`#delete_patient_${event.petId}`}

                        >
                          <i class="fa fa-trash-o m-r-5"
                          ></i> Delete
                        </a>

                      </div>
                    </div>
                    <h4 class="doctor-name text-ellipsis">
                      <a href="profile.html">{event.petName}</a>
                    </h4>

                    <div class="user-country">
                      <i class="fa fa-map-marker"></i> {event.city}

                    </div>

                  </div>

                </div>
              ))}

            </div>


          </div>


          <nav>
            <ul className="pagination">
              <li class="page-item" id="petprev">
                <a class="page-link" onClick={prePage}>Previous</a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i} id="petpage">
                    <a className="page-link"
                      onClick={() => changeCPage(n)}>{n}</a>
                  </li>
                ))
              }
              <li class="page-item acitve" id="petnext">
                <a class="page-link" href="#" onClick={nextPage}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
        {apiData.map((event) => (
          <div key={event.petId}
            id={`delete_patient_${event.petId}`} className="modal fade delete-modal" role="dialog"
          aria-labelledby="deletepatientModalLabel"
          aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src="assets/img/sent.png" alt="" width="50" height="46" />
                  <h3>Are you sure want to delete {event.petName}?</h3>
                  <div className="m-t-20">

                    <a href="#" className="btn btn-white" data-dismiss="modal">
                      Close
                    </a>
                    <button type="submit" className="btn btn-danger" data-dismiss="modal"
                      onClick={() => onDelete(event.petId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPets; // Exporting the AllPets component as the default export


