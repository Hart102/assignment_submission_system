import Axios from 'axios'
import { useState, useEffect } from 'react'

import { 
    total_assesments, 
    warningMsg, 
    warningMsgResponse, 
    successMsg 
} from '../Actions';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostData from '../components/PostData'



const Question_display_box = () => {
    const dispatch = useDispatch(),
    navigation = useNavigate();
    const adminId = useSelector(state => state.Capure_lecturer_session);
    const WARNING_MSG_RESPONSE = useSelector(state => state.CaptureWarningMsgResponse);

    const [question, setSetQuestion] = useState('')
    const [questionId, setSetQuestionId] = useState('')


    //--------------- Fetch Assignments ---------------
    const fetch_assessments = async() => {
        const response = await Axios.get('http://localhost:5000/fetch/assessments')
        setSetQuestion(response.data)
        dispatch(total_assesments(response.data.length))
    };
    if (WARNING_MSG_RESPONSE == 'Yes' || WARNING_MSG_RESPONSE == 'refresh') {
        fetch_assessments()
        setTimeout(() => {
            dispatch(warningMsgResponse(''))
        }, 8000)
    }


    //----------------- Submission Function-----------------
    // Capturing the right assesment that was clicked to get the students that participated in it.
    const captured_clicked_question = (id) => { 
        let exact_question;
        question.map(quest => quest._id === id ? exact_question = quest : null)
        navigation('/admin/results', {state: exact_question})
    };

    //----------------- Read question function -----------------
    const read_question = async (question_id) => {
        const response = await PostData(
            'http://localhost:5000/admin_read_questions', {id: question_id}
        )
        navigation('/admin/readquestions', {state: response.data})
    }
    
    //--------------- display warning msg ---------------
    const display_warning_msg = () => {
        dispatch(warningMsg('Are you sure you want to delete this question ?'))
    }
    
    //--------------- Delete question function ---------------
    const delete_question = async (id) => {
        // if (WARNING_MSG_RESPONSE == 'Yes'){
            const response = await PostData(
                'http://localhost:5000/delete_question', {id: id}
            )
            setSetQuestionId('')
            // dispatch(warningMsgResponse('')) //Warning msg
            dispatch(successMsg(response.data)) //Success msg
        // }
    }
    // delete_question()


    

    
    useEffect(() => {
        fetch_assessments()
    }, [])


    

  return (
    <div className="mb-5 mt-2">

        <section className="display_box bg-white d-flex flex-column">
            <div className="h5 my-4 font-weight-bold mx-5">Assignments</div>


            <table className="col-md-11 mx-auto bg-white">
                <thead className='border-bottom'>
                    <tr>
                        <th className='p-3'>Course</th>
                        <th className='p-3'>Department</th>
                        <th className='p-3'>Level</th>
                        <th className='p-3'>Date</th>
                        <th className='p-3'>Action</th>
                    </tr>
                </thead>

                {question !== '' && question.map(quest => 
                quest.adminId === adminId && //Preventing admin from seeing another admins post

                    <tbody key={quest._id}>
                        <tr >
                            <td className='p-3'>{quest.courseTitle}</td>
                            <td className='p-3'>{quest.department}</td>
                            <td className='p-3'>{quest.level}</td>
                            <td className='p-3'>{quest.date}</td>
                            <td className='pointer' 
                                onClick={() => captured_clicked_question(quest._id)}>
                                    <div className="btn shadow-sm action">submissions</div>
                            </td>
                            <td className='pointer'
                                onClick={() => read_question(quest.uniqueId)}>
                                    <div className="btn shadow-sm action">Read</div>
                            </td>
                            <td className='pointer' 
                                onClick={() => {
                                    // display_warning_msg()
                                    delete_question(quest.uniqueId)
                                }}>
                                    <div className="btn shadow-sm action">Delete</div>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    </div>
  )
}

export default Question_display_box