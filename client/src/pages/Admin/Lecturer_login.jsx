import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import InputField from "../../components/Cover_components/Form/InputField"
import PostData from "../../components/PostData";
import { lecturer_session } from "../../Actions";

import Axios from "axios";
import { useNavigate} from 'react-router-dom'


const Lecturer_login = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState(''),
    [password, setPassword] = useState(''),
    [server_msg, setServerMsg] = useState('');

    const login_info = {
        username,
        password
    }

    const lecturer_login = async () => { // Handling lecturers login
        const response = await PostData('http://localhost:5000/lecturer_login', login_info)
        {response.data !== 'true' ?  setServerMsg(response.data) : navigation('/admin')}
    }

    const verify_lecturer_session = async() => { // Verifying lecturer's session
        const response = await Axios.get('http://localhost:5000/lecturer_login', login_info)
        if (response.data != 'false') {
            dispatch(lecturer_session(response.data))   
            navigation('/admin')
        }
    }

    useEffect(() => {
        verify_lecturer_session()
    },[])


    return(

        <form className="sign_in scale_in form-group px-5 py-5 my-5 col-md-5 mx-auto">
        <div className="display-6 font-weight-bold text-center my-5">
            <span className="text-warning">STA<span className="text-dark">FF</span> LOG</span>IN
        </div>
        <div className="mx-lg-5">
            <InputField type={'text'} placeholder={'username'} onchange={(e) => {
                setServerMsg('')
                setUsername(e.target.value)
            }}/>
        </div>
        <div className="my-4 px-lg-5">
            <InputField type={'text'} placeholder={'Password'} onchange={(e) => {
                setServerMsg('')
                setPassword(e.target.value)
            }}/>
        </div>

        <div className="px-lg-5">
            <button className="btn btn-block btn-warning py-3 font-weight-bold" onClick={(e) => {
                e.preventDefault()
                lecturer_login()
            }}>LOGIN</button>
        </div>

        <div className={server_msg != '' ? 'text-center text-dark my-3 scale_in' : null}>
            <b>{server_msg}</b>
        </div>
        </form>
    )
}

export default Lecturer_login