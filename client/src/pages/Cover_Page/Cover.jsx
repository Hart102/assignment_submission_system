import '../../components/Cover_components/Cover.css'
import SignUp from '../../components/Cover_components/Form/Sign_up'
import SignIn from '../../components/Cover_components/Form/Sign_in'

import { switch_forms } from "../../Actions"
import { useDispatch } from 'react-redux'



const Cover = () => {
  const dispatch = useDispatch();

  return (
    <>
    <div className="cover d-flex align-items-center">
      <section className='index pt-5'>
        <div className="container d-lg-flex p-0 mt-4">
          <div className="row align-items-center">
            <div className="form-container1 d-flex flex-column justify-content-center col-md-5 p-5">
              <SignUp />
              <SignIn />
            </div>

            <div className="col-md-7">
              <div className="img-container1 d-flex align-items-center text-light">
                <div className="text mx-5 p-lg-4">
                  <h2 className='display-5 text-warning' style={{fontWeight: '700'}}>Assignment Submission System.</h2>
                  <p style={{fontSize: '1.1em'}}>Design and implementation of student's E-assignment submission and management system.</p>
                  <div className='d-flex'>
                    <span 
                      className="nav-link btn text-white py-3 px-lg-5 pointer" 
                      onClick={() => dispatch(switch_forms('login'))} style={{background: '#00ade4'}}><b>Sign in</b>
                    </span>
                    <span 
                      className="nav-link btn text-dark bg-white mx-4 py-3 px-lg-5 pointer"  
                      onClick={() => dispatch(switch_forms('SIGN_IN'))}><b>Sign up</b>
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    </>
  )
}

export default Cover