import { useDispatch } from "react-redux"
import { warningMsg, warningMsgResponse } from "../../Actions"


const Warning = ({ msg }) => {
  const dispatch = useDispatch()

  //------- Hide warning msg function -------
  const hideMsg = (arg) => {
    dispatch(warningMsg(''))
    dispatch(warningMsgResponse(arg))
  }


  return (
    <section className={!msg ? "d-none" : "px-4"}
      style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.9))',
      position: 'fixed', width: '100%', height: '100vh', 
      left: '0', top: '0', zIndex: '2000'}}>

      <div className="col-md-5 bg-white p-4 mx-auto my-5">
        <div className="py-4">
          <p>{msg}</p>
        </div>

        <div className="d-flex justify-content-between">
          <div className="btn border px-3" id="warningBtn" 
            onClick={(e) => hideMsg(e.target.textContent)}>Yes
          </div>

          <div className="btn border px-3" id="warningBtn" 
            onClick={(e) => hideMsg(e.target.textContent)}>No
          </div>
        </div>
      </div>
    </section>
  )
}

export default Warning

// #f1f5f8;