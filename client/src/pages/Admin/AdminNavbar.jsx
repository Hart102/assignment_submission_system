import { Link } from "react-router-dom"

const AdminNavbar = ({ onclick }) => {
  return (
    <div className="admin">
        <nav className='header_container shadow-sm'>
            <div className='bg-white py-2'>
                <div className="container">
                    <div className="px-5 d-flex justify-content-between align-items-center font-weight-bold text-white">
                        <div className='h4'>E-campus</div>
                        <div className='btn shadow-sm pointer' onClick={onclick}>Logout</div>
                    </div>
                </div>
            </div>
            <menu className='d-flex align-items-center'>
                <div className="container">
                    <div className="d-flex py-2">
                        <Link  className='nav-link text-dark' to='/admin'>Overview</Link>
                        <Link  className='nav-link text-dark' to='/admin/obj'>Set Obj</Link>
                        <Link  className='nav-link text-dark' to='/admin/setTheory'>Set theory</Link>
                        <Link  className='nav-link text-dark' to='/admin'>Departments</Link>
                    </div>
                </div>
            </menu>
        </nav>
    </div>
  )
}

export default AdminNavbar