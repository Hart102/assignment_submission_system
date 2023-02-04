// REDUCERS 
// FORM SWITCHER 
const Form_switcher = (state = 'SIGN_IN', action) => {
  switch (action.type) {
    case "SWITCH_FORM":
      return state = action.payload

  
    default:
        return state;
  }
}

export default Form_switcher