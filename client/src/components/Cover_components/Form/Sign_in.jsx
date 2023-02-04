import Axios from "axios";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { login_action, switch_forms } from "../../../Actions";

import InputField from "./InputField"
import Form_btn from "./Form_btn";
import PostData from "../../PostData";

const Sign_in = () => {
    const navigation = useNavigate()

    const switch_form = useSelector(state => state.Form_switcher),
    dispatch = useDispatch();

    const [firstname, setFirstname] = useState(''),
    [reg_no, setRegNo] = useState(''),
    [server_msg, setServerMsg] = useState(''),

    userInfo = {firstname, reg_no};
    const handle_login = async () => { //LOGIN FUNCTION
       const response = await PostData('http://localhost:5000/student/login', userInfo)

        if (response.data.user) {
            navigation('/level', {state: response.data.user})

            // setStudentId(studentId)
            // dispatch(login_action(studentId))
        
        }else{
            setServerMsg(response.data)
        }
    }
    
    // const check_session = async () => { // Verify session
    //     const response = await Axios.get('http://localhost:5000/student/login')
    //     // dispatch(login_action(response.data))
    //     // dispatch(switch_forms('LEVEL'))
    // }

    // useEffect(() => {
    //     check_session()
    // },[])



  return (
    <form className={switch_form !== 'login' ? 'd-none' : "sign_in p-5 form-group"}>
        <div className="display-6 font-weight-bold text-center">
            <span className="text-warning h6" style={{fontWeight: '700'}}>LOGIN</span>
        </div>
        <InputField type={'text'} 
            placeholder={'Firstname'} 
            onchange={(e) => {
                setServerMsg('')
                setFirstname(e.target.value)}}
        />
        <div className="my-4">
            <InputField type={'text'} 
                placeholder={'MOUAU/20/ADM/1059'} 
                onchange={(e) => {
                    setServerMsg('')
                    setRegNo(e.target.value)}}
            />
        </div>

        <div>
            <Form_btn btnText={'Login'} onclick={(e) => {
                e.preventDefault()
                handle_login()
                
            }}/>
        </div>

        <div className={server_msg != '' ? 'text-center text-warning my-3 scale_in' : null}>
            <b>{server_msg}</b>
        </div>
    </form>
  )
}

export default Sign_in