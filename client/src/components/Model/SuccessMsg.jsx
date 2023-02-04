import './Model.css'
import { successMsg, warningMsgResponse } from '../../Actions'
import { useDispatch } from 'react-redux'

const SuccessMsg = ({ msg }) => {
  const dispatch = useDispatch()

  return (
    <section className={msg ? 'd-block' : 'd-none'} style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))',
      position: 'fixed', width: '100%', height: '100vh', 
      left: '0', top: '0', zIndex: '2000'}}>

      <div className='SuccessMsg py-4 px-5 mx-auto my-5 bg-white'>
        <h3>Success</h3>
        <p>{msg}</p>
        <p className='border btn' id="warningBtn" 
          onClick={() => {
            dispatch(successMsg(''))
            dispatch(warningMsgResponse(''))
        }}>OK
        </p>
      </div>
    </section>
  )
}

export default SuccessMsg