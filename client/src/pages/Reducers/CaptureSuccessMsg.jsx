
const CaptureSuccessMsg = (state = '', action) => {
    switch (action.type) {
      case "SUCCESS_MESSAGE":
        return state = action.payload
  
    
      default:
        return state;
    }
  }
  
  export default CaptureSuccessMsg
  