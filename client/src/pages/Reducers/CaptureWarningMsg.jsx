
const CaptureWarningMsg = (state = '', action) => {
  switch (action.type) {
    case "DISPLAY_WARNING_MSG":
      return state = action.payload

  
    default:
      return state;
  }
}

export default CaptureWarningMsg
