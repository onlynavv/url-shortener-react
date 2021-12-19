import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory()

    return (
            <nav className='navbar'>
                <div className='nav-center'>
                    <h3 onClick={()=>{history.push('/')}} className="logo">loginRegister</h3>
                    <div className='nav-container'>
                        <Link to='/'>Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
