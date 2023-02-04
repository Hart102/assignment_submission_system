const Sidemenu = ({ icon, text, onclick }) => {
  return (
        
    <li className='p-3 pointer' onClick={onclick}>
      <i className={icon}></i>
      <p className='ml-3'>{text}</p>
    </li>
        
  )
}

export default Sidemenu