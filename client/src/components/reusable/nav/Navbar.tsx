
// React
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// CSS
import '../../../styles/Navbar.css';

interface NavbarProps {
    title:string;
}

type LocationString = 'households'|'lists'|'account'|'dashboard';

export const Navbar: React.FC<NavbarProps> = (props) => {

    const route = useLocation().pathname.replace('/','');
    const [activeCard, setActiveCard] = useState<LocationString>((route === '' ? 'dashboard' : route) as LocationString);    

    return (
        <nav className="Navbar">
            <span className='Navbar-header'>
                <h1>{activeCard.charAt(0).toUpperCase() + activeCard.slice(1)}</h1>
            </span>
            <span className='Navbar-buttons'>
                <Link to='/' className={`Navbar-button ${activeCard==='dashboard'?'active':''}`} onClick={()=>{setActiveCard('dashboard')}} id='show-dashboard-button' >Dashboard</Link>
                <Link to='/households' className={`Navbar-button ${activeCard==='households'?'active':''}`} onClick={()=>{setActiveCard('households')}} id='show-households-button' >Households</Link>
                <Link to='/lists' className={`Navbar-button ${activeCard==='lists'?'active':''}`} onClick={()=>{setActiveCard('lists')}} id='show-todo-lists-button' >Todo Lists</Link>
                <Link to='/account' className={`Navbar-button ${activeCard==='account'?'active':''}`} onClick={()=>{setActiveCard('account')}} id='show-account-button' >Account</Link>
            </span>
        </nav>
    );
}