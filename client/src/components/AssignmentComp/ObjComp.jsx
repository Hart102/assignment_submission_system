
const QuestionComp = ({ index, question, onclickA, optionA, onclickB, optionB, optionC, onclickC }) => {
  
  return (
    <>
    
      <span>
        <div className="d-flex">
          <div>{index + 1}</div>
          <p className='text-capitalize text-dark ml-3'>{question}</p>
        </div>

        <div className="answers d-flex flex-column text-capitalize mb-5 py-4 border-bottom">
          <span>
            <input 
              type="radio" 
              className='my-2' 
              name={index} 
              id={optionA}
            />

            <label 
              htmlFor={optionA} 
              className='ml-3' 
              onClick={onclickA}>
              {optionA}
            </label>
          </span>

          <span>
            <input 
              type="radio" 
              className='my-2' 
              name={index} 
              id={optionB}
            />

            <label 
              htmlFor={optionB} 
              className='ml-3' 
              onClick={onclickB}>
              {optionB}
            </label>

          </span>
          
          <span>
            <input 
              type="radio" 
              className='my-2' 
              name={index} 
              id={optionC}
            />

            <label 
              htmlFor={optionC} 
              className='ml-3' 
              onClick={onclickC}>
              {optionC}
            </label>

          </span>
        </div>
      </span>
    </>
  )
}

export default QuestionComp