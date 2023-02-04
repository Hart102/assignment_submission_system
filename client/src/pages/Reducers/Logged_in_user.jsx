// ERROR MSG 
const logged_in_user = (state = "", action) => {
    switch (action.type) {
        case "LOGGED_USER":
            return state = action.payload
            
        
        default:
            return state;
    }
}

export default logged_in_user
