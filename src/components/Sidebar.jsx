 import React from "react"
import { Link } from "react-router-dom"
import "../css/Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUser,
  faUsers,
  faFileAlt,
  faShieldAlt,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="sidebar col-2">
     <h3> <Link  className="nav-link text-decoration-none" to="/dashboard" >workasana</Link></h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/projects">
            <FontAwesomeIcon icon={faUser} />
            Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/teams">
            <FontAwesomeIcon icon={faUsers} />
            Team
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/reports">
            <FontAwesomeIcon icon={faFileAlt} />
            Reports
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link d-flex align-items-center gap-2" to="/dashboard">
            <FontAwesomeIcon icon={faShieldAlt} />
           Setting
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
