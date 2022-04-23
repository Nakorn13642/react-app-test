import { getProfile } from "../../services/auth"

export const GET_PROFILE = "GET_PROFILE";

export const getProfileAction = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await getProfile();
            dispatch({
                type: GET_PROFILE,
                payload: {
                    profile: response.data.user // {id: 1, fullname: "Mary Doe"...}
                }
            });
        }
    }
}