import '../Assignment/Assignment.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { warningMsg, 
  warningMsgResponse, switch_forms, successMsg 
} from '../../Actions'

import PostData from '../../components/PostData'
import Warning from '../../components/Model/Warning'
import SuccessMsg from '../../components/Model/SuccessMsg'

import ObjComp from '../../components/AssignmentComp/ObjComp'
import TheoryComp from '../../components/AssignmentComp/TheoryComp'
import { QuestionTemplate } from '../../components/Module'




const Assignment_page = () => {

  const location = useLocation(),
  navigation = useNavigate(),
  dispatch = useDispatch();

  const WARNING_MSG = useSelector(state => state.CaptureWarningMsg)
  const SUCCESS_MSG = useSelector(state => state.CaptureSuccessMsg)
  const WARNING_MSG_RESPONSE = useSelector(state => state.CaptureWarningMsgResponse);
  
  const [theory_questions, setTheory_questions] = useState('')
  const [objective_questions, setObjective_questions] = useState('')
  const [switch_questions, setSwitch_questions] = useState('')

  const [studentAnswer, setStudentAnswer] = useState('');
  const [studentId, setStudentId] = useState(location.state.student.newId);


  //************* Choose assesment functionality *********************
  const select_assesment = (id) => {
    location.state.Assignments.map(questions => {
      if (questions._id == id) {
        fetch_selected_questions(questions)
        setSwitch_questions(questions.question_type)
      }
    })
  }


  //*********** Fetch selected questions functionality **********************
  const fetch_selected_questions = async (question) => { 
    const response = await PostData('http://localhost:5000/fetch_selected_question', question)

    if (response.data[0].question_type == 'thoery'){
      setTheory_questions(response.data)
    }else{
      setObjective_questions(response.data)
    }

  } 

  //-------------- Display warning msg --------------
  const display_warning_msg  = () => {    
    dispatch(warningMsg('Are you sure you want to submit ?'))
  }



  // --------------- Objective question properties --------------- 
  var answers_container = [];
  var calculateStudentScore
  const removeDuplicates = (arr) => [...new Set(arr)] // Remove duoble answers
   
  // Capture clicked questions and the student answer 
  const capture_answered_question = (questionId, studentAns) => {
    let ans_container = document.querySelector('.ans_container')
    
    objective_questions.map(question => {
      if (question.newId === questionId) {
        if (question.ans === studentAns) {
          let p = document.createElement('p')
          p.setAttribute('class', 'student-answers')
          p.innerHTML = studentAns
          
          ans_container.append(p)
        }
      }
    })
  }



  
  if (theory_questions) {
    //------------ Submite theory assessment ------------
    const submit_theory = async () => {
    
     var data = new QuestionTemplate (
      studentId,
      theory_questions[0].courseTitle,
      theory_questions[0].level,
      theory_questions[0].department,
      theory_questions[0].date,
      '',
      'theory',
      theory_questions[0].uniqueId,
      studentAnswer
     )
     
     const response = await PostData(
      'http://localhost:5000/store_student_assesment_file', data
     ) 
     if(response.data) {
      dispatch(successMsg(response.data))
     }
   }
 
   if (WARNING_MSG_RESPONSE === 'Yes') {
    submit_theory()
    // Preventing double submission
    dispatch(warningMsgResponse(''))
   } 


  }else{
    // calculate student Score 
    let FinalScore;
    calculateStudentScore = () => {
      document.querySelectorAll('.student-answers').forEach(ans => {
        answers_container.push(ans.textContent)
        FinalScore = removeDuplicates(answers_container)
        return FinalScore
      })
    }
    
    
    // --------------- Objective question properties --------------- 
    const student_result = async () => {// Calculating result
      calculateStudentScore()
      let score = FinalScore.length

      var result = new QuestionTemplate (
        studentId,
        objective_questions[0].courseTitle,
        objective_questions[0].level,
        objective_questions[0].department,
        objective_questions[0].date,
        score,
        'objective',
        objective_questions[0].uniqueId,
      )

      // Sending result to the server
      const response = await PostData('http://localhost:5000/post_objective_result', result) 
      if (response.data == 'true') {
        dispatch(successMsg('Submission successful'))
      }
    }
    if (WARNING_MSG_RESPONSE == 'Yes') {
      student_result()
      // Preventing double submission
      dispatch(warningMsgResponse(''))
    }
  }
  
  


  //--------------Hamburger Menu function --------------
  let clicked = 'false'
  const elementSelector = (element) => document.querySelector(element)
  const hamburgerMenuFunction = () => {
    if (clicked == 'false'){
      elementSelector('.menu-list').classList.add('show')
      elementSelector('.fa').setAttribute('class', 'fa fa-times fa-2x pointer')
      clicked = 'true'
      
    }else{
      elementSelector('.menu-list').classList.remove('show')
      elementSelector('.fa').setAttribute('class', 'fa fa-bars fa-2x pointer')
      clicked = 'false'
    }
  }


  // ------------ Verify student session ------------
  useEffect(() => {
    if (location.state == null) {
      navigation('/')
    }


    // If submission is successful redirect user to login 
    document.addEventListener('click', (e) => {
      if (e.target.textContent == 'OK') {
        dispatch(warningMsg(''))
        dispatch(switch_forms('login'))
        navigation('/')
      }
    })
  },[])

  return (
    <>
      <header className='fixed-top'>
        <div className="container col-md-8 d-flex justify-content-between aling-items-center py-4 px-2 mx-auto bg-white shadow-sm">
          <i className="fa fa-bars fa-2x pointer" onClick={hamburgerMenuFunction}></i>

          <div className="logo h4 font-weight-bold">
            <span className="text-warning">E-</span>campus
          </div>
        </div>

        <menu>
          <ul 
            className='menu-list list-unstyled col-md-2 text-capitaliz py-5 px-3 my-5 bg-white border-right'>
            <b>Assessment:</b>
            {location.state ? location.state.Assignments.map((questions, indx) => 
            // ********* Assessment List ******************
              <div className="my-5 pointer text-capitalize" key={indx} onClick={() => {
                select_assesment(questions._id )
                hamburgerMenuFunction()
              }}>
                <span className="d-flex">
                  <b className='mx-30'>{questions.courseTitle}</b>
                </span>
                <li>{questions.question_type}</li> 
              </div>
            ) : null}
          </ul>
        </menu>
      </header>




     
      <div className="question-container col-md-8 d-flex p-lg-5 px-3 mx-auto bg-white shadow-sm" style={{minHeight: '100vh'}}>
        {/*************** Theory questions section ****************/}
        <section 
        className={theory_questions !== '' 
        && theory_questions[0].question_type == 'thoery' 
        && switch_questions == 'thoery' ? "my-5 py-5 mx-auto" : 'd-none'}>

          {theory_questions !== '' 
          && theory_questions[0].question_type == 'thoery' 
          && theory_questions.map((quest, index) => 

            <div key={index}>
              <TheoryComp 
                courseTitle={
                  theory_questions !== '' ? 
                  theory_questions[0].courseTitle : null
                }
                index={index} 
                question={quest.question}
              />
            </div>
          )}

          <form className='form-group my-5'>
            <textarea
              className='border p-3' 
              placeholder='Write your answers here.

              Eg: 1 computer is defined as ......'
              onChange={(e) => setStudentAnswer(e.target.value)}
              id='theory'>
            </textarea>

            <button 
              className='btn py-2 px-5 mt-5 btn-white shadow-sm border' 
              onClick={(e) => {
                e.preventDefault()
                display_warning_msg()
            }}>Submit</button>
          </form>
        </section>
      


        {/***************************** Obejective question section **************************** */}
        <section 
        
        className={objective_questions !== '' 
        && objective_questions[0].question_type == 'objective' 
        && switch_questions == 'objective' ? 'col-md-12 mt-5 py-5 mx-auto' : 'd-none'}>

          {objective_questions != '' && objective_questions.map((qust, index) => 
            <div key={index}>
              {/*-------- Storing student answer here --------*/}
              <div className='ans_container d-none'></div>

              <ObjComp 
                name={index}
                index={index}
                question={qust.question}
                
                onclickA={(e) => {
                  calculateStudentScore()
                  capture_answered_question(qust.newId, e.target.textContent)
                }}

                onclickB={(e) => {
                  calculateStudentScore()
                  capture_answered_question(qust.newId, e.target.textContent)
                }}

                onclickC={(e) => {
                  calculateStudentScore()
                  capture_answered_question(qust.newId, e.target.textContent)
                }}

                optionA={qust.a}
                optionB={qust.b}
                optionC={qust.c}
              />
            </div>
          )}

          <div className="d-flex justify-content-end1">
            <button className='btn border py-2 px-5 shadow-sm' onClick={(e) => {
              e.preventDefault()
              display_warning_msg()
            }}>Submit</button>
          </div>

        </section>


      <Warning msg={WARNING_MSG} />
      <SuccessMsg msg={SUCCESS_MSG}/>

      <Outlet />
    </div>
    </>
  )

  
}

export default Assignment_page