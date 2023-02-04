import { useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import PostData from "../components/PostData"


const Level = () => {
    const location = useLocation()
    const navigation = useNavigate();
    const[studentData, setStudentData] = useState(location.state)

    const [level, setLevel] = useState(''),
    [dept, setDept] = useState(''),
    [serverMsg, setServerMsg] = useState('');

    const assignmentInfo = {
        level: level.toLowerCase(),
        dept: dept.toLocaleLowerCase()
    };
    
    // Fetching level questions 
    const fetchAssignment = async () => {
        const response = await PostData(
            'http://localhost:5000/fetch_avaliable_questions', assignmentInfo
        )

       

        if (!response.data.err) {
            var assigmentContainer = [], unwritten;

            if (studentData.assesments.length == 0) {
                // console.log('student can see all the assingments')
                const data = {
                    student: studentData,
                    Assignments: response.data
                }
                navigation('/assignment', {state: data})

            }else{
                // studentData.assesments.map(obj => {
                    // unwritten = response.data.filter(assignment =>  assignment.uniqueId !== obj.refId 
                    // ) 

                    // response.data.map(assesment => {
                    //     if (assesment.uniqueId == obj.refId) {
                    //         console.log(assesment.courseTitle, 'written')

                    //     }else{
                    //         console.log(assesment)
                    //     }
                    // })


                    let written = response.data.map(ele => ele)
                    const data = {
                        student: studentData,
                        Assignments: written
                    }
                    navigation('/assignment', {state: data})
                   
                // })
            }

            

            













            
            // const Difference = response.data.filter(obj => !studentData.assesments.includes(obj))

            // if (JSON.stringify(studentData.assesments) === JSON.stringify(response.data)) {
            //     console.log('true')

            // }else{
            //     console.log('false')
            // }

            // studentData.assesments.map(quest => {
            //     Difference.find(obj => {
            //         if (obj.uniqueId != quest.uniqueId) {
            //             assigmentContainer.push(obj)

            //             setTimeout(() => {
            //                 const data = {
            //                     student: studentData,
            //                     Assignments: assigmentContainer
            //                 }
            //                 navigation('/assignment', {state: data})
            //             }, 1500)


            //         }else if (obj.uniqueId === quest.uniqueId){
            //             console.log(`Congratulation ${studentData.firstname}, you have written all the assignment. Keep it up!`)
            //         }
            //     })

            // })



            // navigation('/assignment', {state: data})
        }else{
            setServerMsg(response.data.err)
        }
    }












    //Checking if the student have already participated in the assesment
    // const [check_avaliable_assesment, setCheck_avaliable_assesment] = useState('');
    // const confirm_participant = async () => {
    //     const response = await PostData(
    //         'http://localhost:5000/confirm_participant', 
    //         {user_assesment: logged_in_user.assesments, assignmentInfo}
    //     )

    //     if (!response.data.error) {
    //         navigation('/assignment', {state: response.data})

    //     }else{
    //        setCheck_avaliable_assesment(response.data.error)
    //     }
    // };


   


  return (
    <section style={{minHeight: '100vh', display: 'flex', alignItems: 'center',}}>

        <form className="form-group level mx-auto my-4 text-center col-md-4 bg-white shadow-sm py-lg-5 px-lg-5 px-3">
            <div className="display-6 font-weight-bold text-center mb-3 mt-3">
                <span className="text-warning">Lev</span><span className="text-dark">el</span>
            </div>
            <p className="text-center text-dark">
                Select level and departmant to see their assignment
            </p>

            <div className="mt-4">
                <select className='select py-3 my-3 px-4 form-control'
                style={{background: 'transparent'}} 
                    onChange={(e) => {
                    setDept(e.target.value)
                    setServerMsg('')
                }}>
                <option value="0" defaultValue={true} disabled={false}>Select Department</option>
                <option value={"computer science"}>Computer science</option>
                <option value={"computer engineering"}>Computer engineering</option>
                <option value={"chemical engineering"}>Chemical engineering</option>
                <option value={"electircal engineering"}>Electircal engineering</option>
                <option value={"agricultural engineering"}>Agricultural engineering</option>
                <option value={"ugc"}>UGC</option>
                </select>


                <select className='select py-3 my-3 px-4 form-control'
                style={{background: 'transparent'}} 
                    onChange={(e) => {
                    setLevel(e.target.value)
                    setServerMsg('')
                }}>
                <option value="0" defaultValue={true} disabled={false}>Select Level</option>
                <option value={"100L"}>100L</option>
                <option value={"200L"}>200L</option>
                <option value={"300L"}>300L</option>
                <option value={"400L"}>400L</option>
                <option value={"500L"}>500L</option>
                <option value={"600L"}>600L</option>
                </select>

                <button className="btn btn-block py-3 px-4 text-light text-capitalize font-weight-bold"
                    style={{background: '#00ade4'}} 
                    onClick={(e) => {
                    e.preventDefault()
                    fetchAssignment()
                    // confirm_participant()
                }}>next</button>

                <div className={serverMsg != '' ? 
                    'alart text-center text-warning text-capitalize scale_in mx-auto' : 
                null}>
                    <b>{serverMsg}</b>
                </div>
            </div>
        </form>
    </section>
  )
}

export default Level