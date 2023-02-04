import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

import Options from "../../components/Options";
import PostData from '../../components/PostData'

import AdminNavbar from "../Admin/AdminNavbar";
import { elementSelector } from "../../components/Module";

import { useSelector, useDispatch } from "react-redux";

import SuccessMsg from '../../components/Model/SuccessMsg'
import { clearInput } from "../../components/Module";
import { successMsg } from "../../Actions";



const Read_assessment_file = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    
    const [fullName, setFullName] = useState(
        `${location.state.student_details.firstname}
        ${location.state.student_details.lastname}`
    ),
    [regNo, setRegNo] = useState(location.state.student_details.reg_no),
    [department, setDepartment] = useState(location.state.student_details.reg_no),
    [mark, setMark] = useState('');

    const SUCCESS_MSG = useSelector(state => state.CaptureSuccessMsg);


    //-------------- Fetching assessment document function --------------
    const fetch_student_assessment_doc = async () => { 
        let trackingId = location.state.tracking_id
        const response = await PostData(
            'http://localhost:5000/fetch_student_assessment_doc', {trackingId: trackingId}
        )

        // Breaking the text to newline 
        let result = response.data.replace(/\n/g, '<br /><br />')
        elementSelector('.display').innerHTML = result
    }

    const info = {
        trackingId: location.state.tracking_id,
        score: mark
    }

    //---------- Award mark function ----------
    const award_mark = async () => { 
        const response = await PostData('http://localhost:5000/award_mark', info)
        if (response.data) {
            dispatch(successMsg(response.data))
            clearInput('mark')
        }
    }


    useEffect(() => {
        fetch_student_assessment_doc()
    },[])




  return (
      <section className="Read-student-assesment-file">
        <AdminNavbar />
        <div className="container p-sm-0 my-lg-5">
            <div className="student-info px-lg-5 p-3 py-3 border-bottom bg-white col-md-11 mx-auto d-lg-flex justify-content-between">
                <div className="student_details text-capitalize">
                    <b className="h6 font-weight-bold">Course: csc 422</b>
                    <div className="name my-4"><span className="h6">Name:  </span>{fullName}</div>
                    <div className="dept my-4"><span className="h6">Department:</span> {department}</div>
                    <div className="reg_no my-4"><span className="h6">Registration number:</span> {regNo}</div>
                </div>

                <div className="bg-danger1 d-flex flex-column justify-content-end">
                    <div className="h6 font-weight-bold m-0">Award marks</div>
                    <div className="d-flex align-items-center">
                        <div className="col-md-7">
                            <Options 
                                type={'number'} 
                                placeholder={'Marks'} 
                                value={(e) => setMark(e.target.value)}
                                id={'mark'}
                            />
                        </div>
                        <div className="btn btn-dark py-2 ml-2" onClick={award_mark}>Award</div>
                    </div>
                </div>
            </div>
            <div className="bg-white px-lg-5 p-3 col-md-11 mx-auto">
                <div className="assessment_body my-lg-3" style={AssessmentBody}>
                    <p className="display"></p>
                </div>
            </div>
        </div>

        <SuccessMsg msg={SUCCESS_MSG} />
    </section>
  )
}


const AssessmentBody = {
    textAlign: 'justify',
    fontSize: '17px',
    lineHeight: '35px',
    letterSpacing: '1px'
}

export default Read_assessment_file