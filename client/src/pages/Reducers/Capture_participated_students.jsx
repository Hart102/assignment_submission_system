
const Capture_participated_students = (state = '', action) => {
    switch (action.type) {
        case "PARTICIPATED_STUDENTS":
          return state = action.payload
    
      
        default:
            return state;
    }
}

export default Capture_participated_students
