import { combineReducers } from 'redux'
import Form_switcher from "./Form_switcher";
import logged_in_user from './Logged_in_user';
import CaptureWarningMsg from './CaptureWarningMsg';
import CaptureWarningMsgResponse from './CaptureWarningMsgResponse';
import CaptureSuccessMsg from './CaptureSuccessMsg';
import Capture_participated_students from './Capture_participated_students';
import Capture_sort_participant_result from './Capture_sort_participant_result';
import Capture_total_assesments from './Capture_total_assesments';
import Capure_lecturer_session from './Capure_lecturer_session';


// Reducers
export const reducers = combineReducers({
    Form_switcher,
    logged_in_user,
    CaptureWarningMsg,
    CaptureWarningMsgResponse,
    CaptureSuccessMsg,
    Capture_participated_students,
    Capture_sort_participant_result,
    Capture_total_assesments,
    Capure_lecturer_session
})