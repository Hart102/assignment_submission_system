import '../Admin/Admin.css'
import Axios from 'axios'
import { useEffect } from 'react'

import AdminNavbar from './AdminNavbar'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { warningMsg, warningMsgResponse } from '../../Actions'

import Sidemenu from '../../components/Sidemenu'
import Overviewbox from '../../components/Overviewbox'
import Question_display_box from '../../components/Question_display_box'

import Warning from '../../components/Model/Warning'
import SuccessMsg from '../../components/Model/SuccessMsg'

const Admin = () => {
    const dispatch = useDispatch(),
    navigation = useNavigate(),

    WARNING_MSG = useSelector(state => state.CaptureWarningMsg),
    SUCCESS_MSG = useSelector(state => state.CaptureSuccessMsg),
    WARNING_MSG_RESPONSE = useSelector(state => state.CaptureWarningMsgResponse),
    total_assesments = useSelector(state => state.Capture_total_assesments),
    check_session = useSelector(state => state.Capure_lecturer_session);


    const displayWarningMsg = () => {
        dispatch(warningMsg('Are you sure you want to logout'))
    }

    //---------------- Logout function ----------------
    const lecturer_logout = () => { 
        window.location.reload()
        Axios.get('http://localhost:5000/lecturer_logout')
    }
    if (WARNING_MSG_RESPONSE === 'Yes') {
        lecturer_logout(); dispatch(warningMsgResponse(''))
    }

    //------------ Verify lecturer session ------------
    useEffect(() => { 
        if (!check_session) {navigation('/lecturer_login')}
    },[])



  return (
    <>
    {/* #15242b */}

    <AdminNavbar onclick={() => {displayWarningMsg()}}/>

    <section className='d-flex justify-content-between'>
        
        <div className="main-container py-5">
            <div className="container pt-5 mb-5">
                <section className="box-container text-capitalize">
                    <Overviewbox 
                        text={'total assignments'} 
                        overview={total_assesments}
                    />
                    <Overviewbox 
                        text={'total professors'} 
                        overview={150}
                    />
                    <Overviewbox 
                        text={'total courses'} 
                        overview={150}
                    />
                    <Overviewbox 
                        text={'total departments'} 
                        overview={150}
                    />
                </section>

                <div className="col-md-12">
                    <Question_display_box />
                </div>


                {/******* Warning and successful msg  *******/}
                <Warning msg={WARNING_MSG}/>
                < SuccessMsg msg={SUCCESS_MSG}/>

            </div>
        </div>

        <Outlet />
    </section>
















































    {/* <div className='Admin-home'>
        <div className="mt-50">
            <div className="heading">
                <div className="px-lg-0 px-4">
                    <div className="create-post shadow-sm pl-3">
                        <div className="container1 d-flex justify-content-between align-items-center py-2">
                            <div className='admin-name'><b>welcome Hart</b></div>
                            <button className="btn bg-dark py-3 px-4 text-white font-weight-bold" onClick={create_input}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="admin-content d-flex justify-content-between d-none1">
                APP DETAILS RENDERED HERE
                <div className="app-details border-top">
                    <div className="title px-3 py-1">
                        <p className='mt-3 golden-color'><b className='h6 text-uppercase font-weight-bold'>DASHBOARD</b></p>
                    </div>

                    <ul className='list-unstyled text-white font-weight-bold'>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Overview</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Students</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Department</p></li>
                        <li className='pointer h4' onClick={''}><p className='p-3'>Add product</p></li>
                    </ul>

                </div>

                OVERIEW 
                <div className="scale_in posts mb-5 d-none1">
                    <div className="box-container">
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Customers <br /> {10}</div>
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Products <br /> {30}</div>
                        <div className="display-box shadow-sm bg-white p-4 text-center font-weight-bold h3">Sent Sms <br /> 75</div>
                    </div>
                </div>


                <div className="posts obj-question px-lg-5 py-5">
                </div> */}






                {/* PRODUCTS RENDERED HERE  */}
                {/* <div className="scale_in products posts border bg-white mb-5">
                    <TableHead tableTitle="products"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Product Name'} text={'Price'}/>

                        <div>
                            <TableBody titleName={'product'} text={'product'} />
                        </div>
                    </div>
                </div> */}


                {/* CUSTOMERS RENDERED HERE  */}
                {/* <div className="scale_in customers posts border bg-white mb-5">
                    <TableHead tableTitle="Customers"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Name'} text={'Phone'}/>
                    
                        <TableBody titleName={customer.name} text={customer.phone}/>
                    </div>
                </div> */}

                {/* ADD PRODUCT  */}
                {/* <div className="scale_in add-products posts border bg-white mb-5">
                    <div className="blog-posts">
                        <AddProducts />
                    </div>
                </div> */}
            {/* </div>
        </div>
    </div> */}
    </>
  )
}


// #2c3e50
export default Admin