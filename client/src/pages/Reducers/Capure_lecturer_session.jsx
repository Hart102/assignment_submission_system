
const Capure_lecturer_session = (state='', action) => {
    switch (action.type) {
        case "LECTURER_SESSION":
            return state = action.payload
            
        
        default:
            return state;
    }
}

export default Capure_lecturer_session