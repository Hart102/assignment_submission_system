
const TheoryComp = ({ index, question }) => {

  return (
    <div>
      <div className="pr-lg-5 col-md-10">
        <div className='d-flex my-5'>
          <div className="question_number">{index + 1}</div>
          <p className="text-capitalize ml-3">{question}</p>
        </div>
      </div>
    </div>
  )
}

export default TheoryComp