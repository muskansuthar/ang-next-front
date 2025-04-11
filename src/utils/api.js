import axios from "axios"

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL + url)
        return data;
    } catch (error) {
        return { error: error, msg: "Network error or server not reachable" };
    } 
}

export const postData = async (url, formFields) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_APP_BASE_URL + url, formFields);

        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { error: true, msg: "Network error or server not reachable" };
        }
    }
};



