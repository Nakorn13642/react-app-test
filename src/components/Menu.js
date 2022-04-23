import React from 'react';
import {Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FcRules } from "react-icons/fc";
import { NavLink, useHistory } from "react-router-dom";

import { getProfileAction } from '../redux/actions/auth-action';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/auth';

const Menu = () => {
    const profileRedux = useSelector((state) => state.authReducer.profile );
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect ( () => {
        dispatch(getProfileAction());
    }, [dispatch]);

    const logoutNow = () => {
        logout();
        history.replace('/');
        history.go(0);
    }

    const goToDashboard = () => {
        history.push('/dashboard');
    }


    return (
        <>
            <Navbar bg="success" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/#home">
                <FcRules size={40} color="" />
                    ระบบจัดการข้อมูลข่าวสาร
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavLink className="nav-link" activeClassName="active" to="/" exact>หน้าหลัก</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/about" >เกี่ยวกับเรา</NavLink>
                        
                        

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                    <Nav>
                            {
                                !profileRedux && (
                                    <NavLink className="nav-link" activeClassName="active" to="/login" >เข้าสู่ระบบ</NavLink>
                                )
                            }
                            {
                                profileRedux && (
                                    <span className="text-white nnavbar-text">
                                        ยินดีต้อนรับคุณ {profileRedux.fullname} ID: {profileRedux.id} {" "}
                                        <button className="btn btn-info" onClick={goToDashboard}>
                                            Dashboard
                                        </button>
                                        {" "}
                                        <button className="btn btn-warning" onClick={logoutNow}>
                                            Log out
                                        </button>
                                    </span>
                                )
                            }
                    </Nav>  

                    </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default Menu
