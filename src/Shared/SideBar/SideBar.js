// import React from "react";

// const SideBar = () => {
//   return (
//     <div>
//       <div class="header">
//         <div class="header-left">
//           <a href="" class="logo">
//             <img src="assets/img/logo.png" width="35" height="35" alt="" />
//             <span>PETZEY</span>
//           </a>
//         </div>
//         <a id="toggle_btn" href="javascript:void(0);">
//           <i class="fa fa-bars"></i>
//         </a>
//         <a id="mobile_btn" class="mobile_btn float-left" href="#sidebar">
//           <i class="fa fa-bars"></i>
//         </a>
//         <ul class="nav user-menu float-right">
//           <li class="nav-item dropdown d-none d-sm-block">
//             <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
//               <i class="fa fa-bell-o"></i>
//               <span class="badge badge-pill bg-danger float-right">3</span>
//             </a>
//             <div class="dropdown-menu notifications">
//               <div class="topnav-dropdown-header">
//                 <span>Notifications</span>
//               </div>
//             </div>
//           </li>
//           <li class="nav-item dropdown d-none d-sm-block">
//             <a
//               href="javascript:void(0);"
//               id="open_msg_box"
//               class="hasnotifications nav-link"
//             >
//               <i class="fa fa-comment-o"></i>
//               <span class="badge badge-pill bg-danger float-right">8</span>
//             </a>
//           </li>
//           <li class="nav-item dropdown has-arrow">
//             <a
//               href="#"
//               class="dropdown-toggle nav-link user-link"
//               data-toggle="dropdown"
//             >
//               <span class="user-img">
//                 <img
//                   class="rounded-circle"
//                   src="assets/img/user.jpg"
//                   width="24"
//                   alt="Admin"
//                 />
//                 <span class="status online"></span>
//               </span>
//               <span>Admin</span>
//             </a>
//             <div class="dropdown-menu">
//               <a class="dropdown-item" href="profile">
//                 My Profile
//               </a>
//               <a class="dropdown-item" href="edit-profile">
//                 Edit Profile
//               </a>
//               <a class="dropdown-item" href="settings">
//                 Settings
//               </a>
//               <a class="dropdown-item" href="login">
//                 Logout
//               </a>
//             </div>
//           </li>
//         </ul>
//         <div class="dropdown mobile-user-menu float-right">
//           <a
//             href="#"
//             class="dropdown-toggle"
//             data-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <i class="fa fa-ellipsis-v"></i>
//           </a>
//           <div class="dropdown-menu dropdown-menu-right">
//             <a class="dropdown-item" href="profile.html">
//               My Profile
//             </a>
//             <a class="dropdown-item" href="edit-profile.html">
//               Edit Profile
//             </a>
//             <a class="dropdown-item" href="settings.html">
//               Settings
//             </a>
//             <a class="dropdown-item" href="login.html">
//               Logout
//             </a>
//           </div>
//         </div>
//       </div>
//       <div class="sidebar" id="sidebar">
//         <div class="sidebar-inner slimscroll">
//           <div id="sidebar-menu" class="sidebar-menu">
//             <ul>
//               <li class="menu-title">Main</li>
//               <li class="active">
//                 <a href="dashboard">
//                   <i class="fa fa-dashboard"></i> <span>Dashboard</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="vet">
//                   <i class="fa fa-user-md"></i> <span>Vets</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="pets">
//                   <i class="fa fa-wheelchair"></i> <span>Pets</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="allAppointments">
//                   <i class="fa fa-calendar"></i> <span>Appointments</span>
//                 </a>
//               </li>

//               <li>
//                 <a href="departments">
//                   <i class="fa fa-hospital-o"></i> <span>Departments</span>
//                 </a>
//               </li>

//               <li>
//                 <a href="clinic">
//                   <i class="fa fa-flag-o"></i> <span> Clinic Information </span>
//                 </a>
//               </li>

//               <li>
//                 <a href="schedule">
//                   <i class="fa fa-flag-o"></i> <span> Schedule</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const SideBar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  // Add the active class to the current menu item based on the current location
  const handleSetActiveMenu = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <a href="" className="logo">
            <img src="assets/img/logo.png" width="35" height="35" alt="" />
            <span>PETZEY</span>
          </a>
        </div>
        <a id="toggle_btn" href="javascript:void(0);">
          <i className="fa fa-bars"></i>
        </a>
        <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
          <i className="fa fa-bars"></i>
        </a>
        <ul className="nav user-menu float-right">
          <li className="nav-item dropdown d-none d-sm-block">
            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="badge badge-pill bg-danger float-right">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span>Notifications</span>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown d-none d-sm-block">
            <a
              href="javascript:void(0);"
              id="open_msg_box"
              className="hasnotifications nav-link"
            >
              <i className="fa fa-comment-o"></i>
              <span className="badge badge-pill bg-danger float-right">8</span>
            </a>
          </li>
          <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link user-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src="assets/img/user.jpg"
                  width="24"
                  alt="Admin"
                />
                <span className="status online"></span>
              </span>
              <span>Admin</span>
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="profile">
                My Profile
              </a>
              <a className="dropdown-item" href="edit-profile">
                Edit Profile
              </a>
              <a className="dropdown-item" href="settings">
                Settings
              </a>
              <a className="dropdown-item" href="login">
                Logout
              </a>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-right">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="edit-profile.html">
              Edit Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">Main</li>
              <li
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <Link to="/dashboard" onClick={() => handleSetActiveMenu("dashboard")}>
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/vet" ? "active" : ""}
              >
                <Link to="/vet" onClick={() => handleSetActiveMenu("vet")}>
                  <i className="fa fa-user-md"></i> <span>Vets</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/pets" ? "active" : ""}
              >
                <Link to="/pets" onClick={() => handleSetActiveMenu("pets")}>
                  <i className="fa fa-wheelchair"></i> <span>Pets</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/allAppointments" ? "active" : ""}
              >
                <Link to="/allAppointments" onClick={() => handleSetActiveMenu("appointments")}>
                  <i className="fa fa-calendar"></i> <span>Appointments</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/departments" ? "active" : ""}
              >
                <Link to="/departments" onClick={() => handleSetActiveMenu("departments")}>
                  <i className="fa fa-hospital-o"></i> <span>Departments</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/clinic" ? "active" : ""}
              >
                <Link to="/clinic" onClick={() => handleSetActiveMenu("clinic")}>
                  <i className="fa fa-flag-o"></i> <span>Clinic Information</span>
                </Link>
              </li>
              <li
                className={location.pathname === "/schedule" ? "active" : ""}
              >
                <Link to="/schedule" onClick={() => handleSetActiveMenu("schedule")}>
                  <i className="fa fa-flag-o"></i> <span>Schedule</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
