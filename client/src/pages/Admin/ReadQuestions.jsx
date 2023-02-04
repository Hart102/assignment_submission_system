import { useNavigate, useLocation } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const ReadQuestions = () => {
  const location = useLocation()
  const navigation = useNavigate()

  //- Capture and transport question to the page were it will be edited ----
  const edit_questions = (question_id) => {
    let question = location.state.find(question => question.newId == question_id)
    if (question.question_type == 'thoery') {
      navigation('/admin/setTheory', {state: question})
      
    }else{
      navigation('/admin/obj', {state: question})
    }
  }

  return (
    <>
    <AdminNavbar />

    <div className="read-questions py-5 mt-5">
      <div className="row">
        <div className='my-5 p-lg-5 flex-wrap col-md-11 bg-white mx-auto'>
          <div className="col-md-12">
            {location.state !== null ? location.state.map((questions, index) => 

              <div className="d-flex col-md-12 my-4" key={index}>
                <span>{index += 1}</span>
                <div className="d-flex justify-content-between col-md-12">
                  <div className=" col-md-10">
                      <p className="text-capitalize mx-3">{questions.question}</p>
                  </div>
                  <b className="action p-3 pointer" onClick={() => edit_questions(questions.newId)}>Edit</b>
                </div>
              </div>

            ): null}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ReadQuestions