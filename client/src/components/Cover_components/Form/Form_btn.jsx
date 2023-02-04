const Form_btn = ({btnText, onclick}) => {
  return (
    <div className="mt-4">
      <button 
        className="btn btn-block py-3 text-uppercase text-white" 
        onClick={onclick}>{btnText}
      </button>
    </div>
  )
}

export default Form_btn