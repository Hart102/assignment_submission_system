const Capture_total_assesments = (state = '', action) => {
    switch (action.type) {
        case "TOTAL_ASSESMENTS":
            return state = action.payload
            
        
        default:
            return state;
    }
}

export default Capture_total_assesments