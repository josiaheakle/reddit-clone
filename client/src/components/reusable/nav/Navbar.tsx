
// React
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { useWindowDimensions } from '../../../handlers/DimensionHandler';

// CSS
import '../../../styles/Navbar.css';

interface NavbarProps {
    validRoutes : string[];
}

export const Navbar: React.FC<NavbarProps> = (props) => {

    // Route 
    const route = useLocation().pathname;
    const [activeCard, setActiveCard] = useState<string>('');
    const [invalidPath, setInvalidPath] = useState<boolean>(false);

    // Mobile 
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const {width} = useWindowDimensions();



    const updateActiveCard = () => {
        setMobileOpen(false);
        setActiveCard(route.replace('/','') === '' ? 'dashboard' : route.replace('/',''));
    }

    const openMobileMenu = () => {
        setMobileOpen(!mobileOpen)
    }

    useEffect(() => {
        if (!props.validRoutes.includes(route)) setInvalidPath(true);
        updateActiveCard();
    }, [route]);

    useEffect(() => {
        if (width >= 800) setIsMobile(false);
        if (width < 800) setIsMobile(true);
    }, [width])
 
    return (
        <>
        <nav className="Navbar">
            {invalidPath?
                <Redirect to='/'/>
            :null}
            <span className='Navbar-header'>
                <h1>{activeCard.charAt(0).toUpperCase() + activeCard.slice(1)}</h1>
            </span>
            {isMobile ? 
                <div className='mobile-menu-button-container'>
                    <button className='mobile-menu-button' onClick={openMobileMenu}>
                        <div className='mobile-menu-bar'></div>
                        <div className='mobile-menu-bar'></div>
                        <div className='mobile-menu-bar'></div>
                    </button>
                </div>
            : null}
                <span className={`Navbar-buttons ${mobileOpen?'open':null}`}>
                    {isMobile ? 
                        <h1 className="Navbar-header">Keep Connect</h1>
                    :null}
                    <Link to='/' className={`Navbar-button ${activeCard==='dashboard'?'active':''}`} onClick={()=>{setActiveCard('dashboard')}} id='show-dashboard-button' >Dashboard</Link>
                    <Link to='/households' className={`Navbar-button ${activeCard==='households'?'active':''}`} onClick={()=>{setActiveCard('households')}} id='show-households-button' >Households</Link>
                    <Link to='/lists' className={`Navbar-button ${activeCard==='lists'?'active':''}`} onClick={()=>{setActiveCard('lists')}} id='show-todo-lists-button' >Todo Lists</Link>
                    <Link to='/account' className={`Navbar-button ${activeCard==='account'?'active':''}`} onClick={()=>{setActiveCard('account')}} id='show-account-button' >Account</Link>
                </span>
        </nav>
        {props.children}
        </>
    );
}