// REDUX ACTIONS 
// FORM SWITCHER 
export const switch_forms = (action) => {
    return{
        type: "SWITCH_FORM",
        payload: action
    }
}

// Student session
export const login_action = (action) => {
    return{
        type: "LOGGED_USER",
        payload: action
    }
}

// Verify lecturer's session 
export const lecturer_session = (action) => {
    return{
        type: "LECTURER_SESSION",
        payload: action
    }
}



// WARNING MSG
export const warningMsg = (action) => {
    return{
        type: "DISPLAY_WARNING_MSG",
        payload: action
    }
}

// WARNING MSG RESPONSE
export const warningMsgResponse = (action) => {
    return{
        type: "WARNING_MSG_RESPONSE",
        payload: action
    }
}

// SUCCESS MSG
export const successMsg = (action) => {
    return{
        type: "SUCCESS_MESSAGE",
        payload: action
    }
}


// PARTICIPATED STUDENTS
export const participated_students = (action) => {
    return{
        type: "PARTICIPATED_STUDENTS",
        payload: action
    }
}

// SORT PARTICIPANTS RESULT BEFORE DISPLAY
export const sort_participants_result = (action) => {
    return{
        type: "SORT_PARTICIPANTS_RESULT",
        payload: action
    }
}

// TOTAL NUMBER OF ASSESMENTS
export const total_assesments = (action) => {
    return{
        type: "TOTAL_ASSESMENTS",
        payload: action
    }
}
