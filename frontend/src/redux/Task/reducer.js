import { GET_TASK_SUCCESS, PATCH_TASK_SUCCESS, POST_TASK_SUCCESS, TASK_DELETE, TASK_FAILURE, TASK_REQUEST, TOGGLE_STATUS } from "../actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    tasks: [],
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case TASK_REQUEST:

            return { ...state, isLoading: true };

        case TASK_FAILURE:

            return { ...state, isLoading: false, isError: true };

        case POST_TASK_SUCCESS:

            return { ...state, isLoading: false, isError: false };

        case GET_TASK_SUCCESS:
            return { ...state, isLoading: false, tasks: payload };
        case PATCH_TASK_SUCCESS:

            return { ...state, isLoading: false };
        case TASK_DELETE:
            return { ...state, tasks: state.tasks.filter((task) => task._id !== payload) };
        case TOGGLE_STATUS:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === payload._id ? { ...task, status: !task.status } : task
                )
            };
        default:

            return state;
    }
}

