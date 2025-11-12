import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './header.css'
import { Link, useLocation } from 'react-router-dom'
const nav = () => {
    const location = useLocation();
    const handleClick = (path) => {
        setActiveLink(path);
    }
    return (
        <div className="container">
            <nav className="navbar  fixed-top bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" to="">MindX</a>
                </div>
            </nav>
            <div className="sidebar">
                <li className='li-nav'>

                    <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`}
                        to="/"
                        onClick={() => handleClick('/')}> Giáo viên
                    </Link>
                </li>
                <li className='li-nav'>
                    <Link to="/teacherPosition"
                        className={`nav-link ${location.pathname === "/teacherPosition" ? 'active' : ''}`}
                        onClick={() => handleClick('/teacherPosition')}>
                        Vị trí công tác
                    </Link>
                </li>
            </div>
        </div>
    )
}

export default nav