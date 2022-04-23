import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const profileRedux = useSelector((state) => state.authReducer.profile );

    return (
        <>
            <Container>
                <h1 className="text-center my-4">Dashboard</h1>
                {
                    profileRedux && (
                        <h3 className="text-center my-4">ยินดีต้อนรับคุณ {profileRedux.fullname}</h3>
                    )
                }
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Link className="btn btn-success" to="/dashboard/user">ข้อมูลผู้ใช้งาน</Link>
                    <Link className="btn btn-danger" to="/dashboard/report">รายงาน</Link>
                </div>
                
            </Container>  
        </>
    )
}

export default DashboardPage
