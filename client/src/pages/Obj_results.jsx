import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostData from "../components/PostData";


const Obj_results = () => {
    const location = useLocation(),
    navigation = useNavigate();

    const [sort_participated_students, setSort_participated_students] = useState(location.state)
    const [participated_students, setParticipated_students] = useState('')

    const fetch_participated_students = async () => { // Fetch student who participated in the assignment
        const response = await PostData('http://localhost:5000/fetch_participated_students', location.state)
        setParticipated_students(response.data)
    }

    const capture_assessment_file_tracking_id = (student_details, tracking_id) => { 
        // Capture and transfer student's details and assessment file tracking id to the page it will be used
        const info = {
            student_details,
            tracking_id
        }
        navigation('/admin/read_assessment', {state: info})
    }

    const print_func = () => { // Print function
        window.print()
    }
    
    useEffect(() => {
        fetch_participated_students()
    }, [])
    
  return (
    <>
    <div className="student_display_container py-5 col-md-12">

        <div className="col-md-12 mx-auto border-bottom mt-3 px-5 d-flex justify-content-between align-items-center bg-white">
            <p className="mt-3">Assessment Result</p>
            <div className="pointer" onClick={() => print_func()}>print result</div>
        </div>



        <table className="col-md-12 mx-auto bg-white">
            <thead className="border-bottom">
                <tr>
                    <th className="p-3">S/n</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Reg No</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Departmant</th>
                    <th className="p-3">Action</th>
                </tr>
            </thead>

            {participated_students !== '' && participated_students.map((student, index) => 
            student.assesments.map((assesment) =>
            sort_participated_students.uniqueId === assesment.uniqueId &&

                <tbody key={index}>
                    <tr>
                        <td className="p-3">{index += 1}</td>
                        <td className="p-3 text-capitalize">{student.firstname}</td>
                        <td className="p-3">{student.reg_no}</td>
                        <td className="p-3">{assesment.courseTitle}</td>
                        <td className="p-3">{assesment.score}</td>
                        <td className="p-3">{student.dept}</td>

                        <td className="p-3 pointer" onClick={() => { //Capturing assessment file tracking id
                            capture_assessment_file_tracking_id(student, assesment.assesment_file_tracking_id)
                        }}>{assesment.question_type === 'theory' ? 'Read' : assesment.question_type}</td>
                    </tr>
                </tbody>
            ))}
        </table>
    </div>

    </>
  )
}

export default Obj_results