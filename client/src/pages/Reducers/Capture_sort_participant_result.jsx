const Capture_sort_participant_result = (state = '', action) => {
  switch (action.type) {
    case "SORT_PARTICIPANTS_RESULT":
      return state = action.payload;
  
    default:
      return state;
  }
}

export default Capture_sort_participant_result