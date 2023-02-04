const FirstInput = ({ label, onchange, id }) => {
  return (
    <div className='text-uppercase d-flex1 align-items-center my-3'>
      <label className='col-md-3'>{label}</label>
      <input type="text" className='form-control col-md-51' onChange={onchange} id={id}/>
    </div>
  )
}

export default FirstInput