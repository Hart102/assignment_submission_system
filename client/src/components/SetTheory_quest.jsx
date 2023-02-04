import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import PostData from "./PostData";
import FirstInput from "./FirstInput"

import { clearInput, date_function, elementSelector } from "./Module";
import { warningMsgResponse, successMsg } from "../Actions";
import SuccessMsg from "./Model/SuccessMsg";


const SetTheory_quest = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const adminId = useSelector(state => state.Capure_lecturer_session);
    const SUCCESS_MSG = useSelector(state => state.CaptureSuccessMsg)

    const [department, setDepartment] = useState(''),
    [courseTitle, setcourseTitle] = useState(''),
    [level, setLevel] = useState(''),
    [question, setQuestion] = useState('');

    //-------- Edit question function --------
    const edit_questions = async (arg) => {
        let questionId

        if (location.state !== null) {
            questionId = location.state.newId

            //---------------- Question to be edited ----------------
            let dpt = elementSelector('#department').value = location.state.department,
            titl = elementSelector('#course').value = location.state.courseTitle,
            lvl =  elementSelector('#level').value = location.state.level,
            qst = elementSelector('#questions').value = location.state.question;

            //---------- Edited question ----------
            let dept = !department ? dpt : department,
            title = !courseTitle ? titl : courseTitle,
            Level = !level ? lvl : level,
            quest = !question ? qst: question;

            const edited_question = {dept, title, Level, quest}

            if (arg == 'true') {
                const res = await PostData(
                    'http://localhost:5000/edit_theory_question', {questionId, edited_question}
                )
                if (res.data.true) {
                    dispatch(successMsg('Question edited successfully')) // Success msg

                    // Empty input boxes 
                    elementSelector('#department').value = ''
                    elementSelector('#course').value = ''
                    elementSelector('#level').value = ''
                    elementSelector('#questions').value = ''
                    
                    //SWitching to set question mode once editing is successful ----------
                    location.state = null
                    
                }else{
                    dispatch(successMsg('Question edited successfully')) // Error msg
                }

            }
        }
    }


    // *************** Set question function ***************
    let today = date_function();//Date function
    let uniqueId = `${date_function()}/${department}/${level}/${'theory'}`;
    
    const theory_question = {
        department,
        courseTitle,
        level, 
        question,
        question_type: 'thoery',
        date: today,
        uniqueId,
        adminId
    }

    let written = {
        date: today,
        department,
        courseTitle,
        level,
        question_type: 'thoery',
        uniqueId,
        adminId
    }

    //--------------- Setting theory questions ---------------
    const set_question = async () => { 
        const response = await PostData('http://localhost:5000/set_question', theory_question)
        dispatch(successMsg(response.data)) // success msg

        if (response.data == 'Question successfully uploaded') {
            clearInput('questions')
        }
        // Sending assesment reference to the databse. It is used in fetching students who participated in the assesments
        await PostData('http://localhost:5000/written_test', written)
    }

    //----------- Fetch latest questions -----------
    const fetch_latest_questions = () => {
        dispatch(warningMsgResponse('refresh'))
    }


    useEffect(() => {
        edit_questions()
    }, [])



  return (
    <div className="theory bg-white text-dark pt-5 pb-2 shadow-sm">
        <form className="form-group p-5 mt-5 col-md-9  mx-auto">
            <div>
                <FirstInput 
                    label={'department'} 
                    onchange={(e) => setDepartment(e.target.value)}
                    id={'department'}
                />
                <FirstInput 
                    label={'course title'} 
                    onchange={(e) => setcourseTitle(e.target.value)}
                    id={'course'}
                />
                <FirstInput 
                    label={'level'} 
                    onchange={(e) => setLevel(e.target.value)}
                    id={'level'}
                />
            </div>

            <textarea 
                className="form-control my-5" 
                placeholder="Set question" 
                onChange={(e) => setQuestion(e.target.value)} 
                id='questions'>
            </textarea>


            <div className="d-flex mt-3 mb-5">
                <button 
                    className={location.state !== null ? 'd-none' : "btn btn-white shadow border font-weight-bold py-2 px-5"} 
                    onClick={(e) => {
                    e.preventDefault()
                    set_question()
                    fetch_latest_questions()
                }}>SET</button>

                <button className={location.state !== null ? "btn btn-white shadow border font-weight-bold py-2 px-5" : 'd-none'} 
                    onClick={(e) => {
                    e.preventDefault()
                    fetch_latest_questions()
                    edit_questions('true')
                }}>Edit</button>
            </div>
        </form>

        <SuccessMsg msg={SUCCESS_MSG}/>
    </div>
  )
}

export default SetTheory_quest