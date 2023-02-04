import { useState, useEffect } from "react"
import FirstInput from "./FirstInput"

import Options from "./Options"
import PostData from './PostData'
import { clearInput } from "./Module"

import { date_function } from "./Module"
import { useLocation } from "react-router-dom"
import { elementSelector } from "./Module"

import { warningMsgResponse, successMsg } from "../Actions";
import SuccessMsg from "./Model/SuccessMsg";
import { useSelector, useDispatch } from "react-redux"


const SetQuestion = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const SUCCESS_MSG = useSelector(state => state.CaptureSuccessMsg)
    const adminId = useSelector(state => state.Capure_lecturer_session);
    
    const [courseTitle, setCourseTitle] = useState(''),
    [department, setDepartment] = useState(''),
    [level, setLevel] = useState(''),
    [question, setQuestion] = useState(''),

    [option1, setOption1] = useState(''),
    [option2, setOption2] = useState(''),
    [option3, setOption3] = useState(''),
    [answer, setAnswer] = useState('');


    //**************** Edit question function ****************
    const edit_questions = async (arg) => {
        let questionId;

        if (location.state !== null) {
            questionId = location.state.newId

            //---------------- Question to be edited ----------------
            let dpt = elementSelector('#department').value = location.state.department,
            titl = elementSelector('#course-title').value = location.state.courseTitle,
            lvl =  elementSelector('#level').value = location.state.level,
            qst = elementSelector('#textarea').value = location.state.question,

            optionA = elementSelector('#optionA').value = location.state.a,
            optionB = elementSelector('#optionB').value = location.state.b,
            optionC = elementSelector('#optionC').value = location.state.c,
            ans = elementSelector('#optionD').value = location.state.ans;

            //---------- Edited question ----------
            let dept = !department ? dpt : department,
            title = !courseTitle ? titl : courseTitle,
            Level = !level ? lvl : level,
            quest = !question ? qst: question,

            optA = !option1 ? optionA : option1,
            optb = !option2 ? optionB : option2,
            optc = !option3 ? optionC : option3,
            correct = !answer ? ans : answer;

            const edited_question = {
                dept, title, Level, quest,
                optA, optb, optc, correct
            }

            if (arg == 'true') {
                const res = await PostData(
                    'http://localhost:5000/edit_objective_question', {questionId, edited_question}
                )

                if (res.data.true) {
                    dispatch(successMsg('Question edited successfully')) // Success msg

                    // Empty input boxes 
                    elementSelector('#department').value = ''
                    elementSelector('#course-title').value = ''
                    elementSelector('#level').value = ''
                    elementSelector('#textarea').value = ''

                    optionA = elementSelector('#optionA').value = ''
                    elementSelector('#optionB').value = ''
                    elementSelector('#optionC').value = ''
                    elementSelector('#optionD').value = ''
                    
                    //SWitching to set question mode once editing is successful ----------
                    location.state = null
                    
                }else{
                    dispatch(successMsg('Question edited successfully')) // Error msg
                }
            }

        }
    }


    //****************** Set question function ******************
    let today = date_function();
    let uniqueId = `${date_function()}/${department}/${level}/${'objective'}`;

    const Obj_question = {
        courseTitle,
        department,
        level,
        question,

        a: option1,
        b: option2,
        c: option3,

        ans: answer,
        date: today,
        question_type: 'objective',
        uniqueId,
        adminId
    }

    let written = {
        date: today,
        courseTitle,
        department,
        level,
        question_type: 'objective',
        uniqueId,
        adminId
    }

    
    const set_question = async () => { // Sending assesments to the database
        const response = await PostData('http://localhost:5000/set_question', Obj_question) 
        
        if (response.data == 'Question successfully uploaded') {
            dispatch(successMsg(response.data))

            clearInput('optionA') // Clearing input fields
            clearInput('optionB')
            clearInput('optionC')
            clearInput('optionD')
            clearInput('textarea')
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
    

    // NPC-CE-3179764581
  return (
    <section className='question bg-white pt-5 pb-2 shadow-sm'>

        <section className='set_question col-md-9 mx-auto'>
            <form className="form-group px-5 pt-5 mt-5">
                <div>
                    <FirstInput 
                        label={'department'} 
                        onchange={(e) => setDepartment(e.target.value)} 
                        id={'department'}
                    />
                    <FirstInput 
                        label={'course title'} 
                        onchange={(e) => setCourseTitle(e.target.value)} 
                        id={'course-title'}
                    />
                    <FirstInput 
                        label={'level'} 
                        onchange={(e) => setLevel(e.target.value)} 
                        id={'level'}
                    />
                </div>
            </form>
            <form className="form-group px-5">
                <div className="line p-3 my-3">SET QUESTION</div>
                <textarea 
                    className='form-control p-3' 
                    placeholder='Question' 
                    onChange={(e) => setQuestion(e.target.value)} 
                    id={'textarea'}>
                </textarea>

                <section className="options d-flex flex-column align-items-center1">
                    <div className="d-flex justify-content-between">
                        <div className="col-md-5">
                            <Options 
                                type={'text'} 
                                value={(e) => 
                                setOption1(e.target.value)} 
                                placeholder={'Option A'} 
                                id={'optionA'}
                            />
                            <Options 
                                type={'text'} 
                                value={(e) => 
                                setOption2(e.target.value)} 
                                placeholder={'Option B'} 
                                id={'optionB'}
                            />
                        </div>
                        <div className="col-md-5">
                            <Options 
                                type={'text'} 
                                value={(e) => setOption3(e.target.value)} 
                                placeholder={'Option C'} id={'optionC'}
                            />
                            <Options 
                                type={'text'}  
                                value={(e) => setAnswer(e.target.value)} 
                                placeholder={'Specify answer here. Answer must match with one option.'} 
                                id={'optionD'}
                            />
                        </div>
                    </div>
                </section>

                <div className="d-flex justify-content-between mt-3 mb-5">
                    <button className={location.state !== null ? "d-none" : "btn btn-white font-weight-bold py-2 px-5 shadow border"} 
                        onClick={(e) => {
                        e.preventDefault()
                        set_question()
                        fetch_latest_questions()
                    }}>SET</button>

                    <button className={location.state !== null ? "btn btn-white shadow border font-weight-bold py-2 px-5" : 'd-none'} 
                        onClick={(e) => {
                            e.preventDefault()
                            edit_questions('true')
                            fetch_latest_questions()
                    }}>Edit</button>
                </div>
            </form>
        </section>

        <SuccessMsg msg={SUCCESS_MSG}/>
    </section>
  )
}

export default SetQuestion