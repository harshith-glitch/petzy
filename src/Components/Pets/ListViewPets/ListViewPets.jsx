import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Listview = () => {
    // Initializing a state variable 'apiData' using the useState hook with initial value an empty array
    const [apiData, setApiData] = useState([]);

    
  const [currentPage, setCurrentPage] = useState(1) // Initializing a state variable 'currentPage' using the useState hook with initial value 1
  const recordsPerPage = 8;    // Setting the number of records to display per page           
  const lastIndex = currentPage * recordsPerPage; // Calculating the index of the last record to display
  const firstIndex = lastIndex - recordsPerPage;  // Calculating the index of the first record to display
  const records = apiData.slice(firstIndex, lastIndex); // Extracting the records to display based on the current page
  const npage = Math.ceil(apiData.length / recordsPerPage) // Calculating the total number of pages
  const numbers = [...Array(npage + 1).keys()].slice(1) // Creating an array of page numbers to display in pagination

    useEffect(() => {
        getData(); // Calling the getData function when the component mounts
     }, []);
   
     const getData = () =>{
       axios.get('https://petservice.dev.skillassure.com/pet/pet/getallpets')
       .then(response => {
           setApiData(response.data);  // Updating the 'apiData' state with the response data
       })
       .catch(error => {
           console.log(error); // Logging any errors that occur during the request
       });
     }

    // Making a DELETE request to delete a specific pet based on the petId
    const onDelete = (petId) => {
        axios
    
          .delete(
            `https://petservice.dev.skillassure.com/pet/pet/delete/${petId}`
          )
    
          .then((response) => {
            getData(response.data)  // Calling the getData function to refresh the data after successful deletion
            
          })
          .catch((error)=>{
            console.error(error); // Logging any errors that occur during the request
            
          })
      };

      function prePage() {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1) // Decreasing the current page number by 1 if it's not the first page
        }
      }
      function changeCPage(petId) {
        setCurrentPage(petId)  // Setting the current page to the selected page number
      }
      function nextPage() {
        if (currentPage !== npage) {
          setCurrentPage(currentPage + 1)  // Increasing the current page number by 1 if it's not the last page
        }
      }
    
    return (
        <div>
            <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="content">
                        <div className="row">
                            <div className="col-sm-4 col-3">
                                <h4 className="page-title">Pets</h4>
                            </div>
                            <div className="col-sm-8 col-9 text-right m-b-20">
                                <Link to="/addPets">
                                <a
                                    href="addPets"
                                    className="btn btn-primary btn-rounded float-right text-light"
                                >
                                    <i className="fa fa-plus"></i> Add Pets
                                </a>
                                </Link>
                            </div>
                            <div className="col-sm-12 text-right m-b-20">
                                <a
                                    className="btn btn-secondary btn-rounded float-right text-light"
                                    
                                >
                                    List View
                                </a>
                                <Link to="/pets">
                                <a
                                    className="btn btn-secondary btn-rounded float-right text-light"
                                    
                                >
                                    Card View
                                </a>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-striped custom-table">
                                        <thead>
                                            <tr>
                                                
                                                <th>petName</th>
                                                <th>petAge</th>
                                                <th>state</th>
                                                <th>phone</th>
                                                <th>email</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((pet) => (
                                                <tr key={pet.petId}>
                                                    
                                                    <td>{pet.petName}</td>
                                                    <td>{pet.petAge}</td>
                                                    <td>{pet.state}</td>
                                                    <td>{pet.parentPhoneNumber}</td>
                                                    <td>{pet.parentEmailId}</td>
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
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <Link to={`/editpets/${pet.petId}`}>
                                                                <a className="dropdown-item" href="editpets">
                                                                    <i className="fa fa-pencil m-r-5"></i> Edit
                                                                </a>
                                                                </Link>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    data-toggle="modal"
                                                                    data-target="#delete_patient"
                                                                >
                                                                    <i className="fa fa-trash-o m-r-5"></i> Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav>
            <ul className="pagination">
              <li class="page-item " id="petprev">
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
              <li class="page-item" id="petnext">
                <a class="page-link" href="#" onClick={nextPage}>Next</a>
              </li>
            </ul>
          </nav>

                </div>

                {apiData.map((event) =>(
        <div id="delete_patient" class="modal fade delete-modal" role="dialog">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body text-center">
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                <h3>Are you sure want to delete {event.petName}?</h3>
                <div class="m-t-20">
                  
                  <a href="#" class="btn btn-white" data-dismiss="modal">
                    Close
                  </a>
                  <button type="submit" class="btn btn-danger" data-dismiss="modal"
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
export default Listview;