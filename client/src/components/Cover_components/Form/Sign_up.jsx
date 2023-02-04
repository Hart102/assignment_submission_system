import { useState } from "react"
import PostData from "../../PostData";

import { useSelector, useDispatch } from 'react-redux'
import { switch_forms } from "../../../Actions";

import InputField from "./InputField"
import Form_btn from "./Form_btn";

const Sign_up = () => {
    const swich_form = useSelector(state => state.Form_switcher),
    dispatch = useDispatch();
    
    const [firstname, setFirstname] = useState(''),
    [lastname, setLastname] = useState(''),
    [dept, setDept] = useState(''),

    [reg_no, setReg_no] = useState(''),
    [serverMsg, setServerMsg] = useState(''),

    userInfo = {
        firstname,
        lastname,
        dept,
        reg_no
    };

    const handle_sign_up = async () => { // user signup function
        const response = await PostData('http://localhost:5000/student_sign_up', userInfo)
        if (response.data == 'true') {
            dispatch(switch_forms('login'))
        }else{
            setServerMsg(response.data)
        }
    }

  return (
    <form className={swich_form != 'SIGN_IN'  ? "d-none" : "sign_up form-group p-5 shadow-sm"}>
        <div className="text-center">
            <span className="text-warning h6" style={{fontWeight: '700'}}>SIGN UP</span> 
        </div>

        <div className="px-lg-50">

            <InputField 
                type={'text'}
                placeholder={'Firstname'} 
                onchange={(e) => {
                setServerMsg('')
                setFirstname(e.target.value)}}
            />
            <InputField 
                type={'text'} 
                placeholder={'Lastname'} 
                onchange={(e) => {
                setServerMsg('')
                setLastname(e.target.value)
            }}/>

            <InputField 
                type={'text'} 
                placeholder={'Department'} 
                onchange={(e) => {
                setServerMsg('')
                setDept(e.target.value)
            }}/>
            <InputField 
                type={'text'} 
                placeholder={'Mouau/20/adm/1059'} 
                onchange={(e) => {
                setServerMsg('')
                setReg_no(e.target.value)
            }}/>
        </div>

        <div className="my-3">
            <Form_btn btnText={'Sign up'} onclick={(e) => {
                e.preventDefault() 
                handle_sign_up()
            }}/>
            <div className={serverMsg != '' ? 'text-center text-white my-3 scale_in' : null}>
                <b>{serverMsg}</b>
            </div>
        </div>
    </form>
  )
}

export default Sign_up