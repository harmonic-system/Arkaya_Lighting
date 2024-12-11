import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

    return (
        <>
            <AdminLayoutWrapper>
                <div className="container">
                    <div className="admin-layout">
                        <div className="admin-navbar">
                            <AdminNavbar />
                        </div>
                        <hr style={{ color: "#ddd", marginRight: "10px" }} />
                        <div className="admin-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </AdminLayoutWrapper>
        </>
    )
}

export default AdminLayout

const AdminLayoutWrapper = styled.section`
.admin-layout{
    display: flex;
    // height: 100vh;
    flex-direction: row;
    margin-top:3rem;

    .admin-navbar{
     flex: 0 0 200px;
     height: 100vh;
    }

    .admin-content{
     flex: 1;
    }

    @media (min-width: 200px) and (max-width: 768px) {
     flex-direction: column;
    }
}
`