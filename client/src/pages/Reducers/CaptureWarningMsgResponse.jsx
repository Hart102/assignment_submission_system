
const CaptureWarningMsgResponse = (state = '', action) => {
    switch (action.type) {
      case "WARNING_MSG_RESPONSE":
        return state = action.payload
  
    
      default:
        return state;
    }
  }
  
  export default CaptureWarningMsgResponse
  