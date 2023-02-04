
const InputField = ({type, placeholder, onchange}) => {
  return (
    <input type={type} 
      className='form-control py-3 my-3 shadow1' 
      placeholder={placeholder}
      onChange={onchange}
    />
  )
}

export default InputField