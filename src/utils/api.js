import axios from "axios"
// import 'dotenv/config';

// const jwtToken = localStorage.getItem('token');

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL + url)
        return data;
    } catch (error) {
        return { error: error, msg: "Network error or server not reachable" };
    } 
}


// from fetchapi

// export const postData = async (url, formData) => {
//     try {
//         const response = await fetch("http://localhost:4000" + url, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${jwtToken}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         });

//         if (response.ok) {
//             const data = await response.json()
//             return data;
//         } else {
//             const errorData = await response.json()
//             return errorData;
//         }
//     } catch (error) {
//         return { error: true, msg: "Network error or server not reachable" };
//     }
// }



//from axios

export const postData = async (url, formFields) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_APP_BASE_URL + url, formFields, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        });

        return response.data; // Axios already parses JSON for you
    } catch (error) {
        // Check if the error has a response from the server
        if (error.response) {
            return error.response.data; // Return the error response from the server
        } else {
            return { error: true, msg: "Network error or server not reachable" };
        }
    }
};

export const editData = async (url, updatedData) => {
    try {
        const response = await axios.put(process.env.NEXT_PUBLIC_APP_BASE_URL + url, updatedData, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        })
        return response.data; // Axios already parses JSON for you
    } catch (error) {
        // Check if the error has a response from the server
        if (error.response) {
            return error.response.data; // Return the error response from the server
        } else {
            return { error: true, msg: "Network error or server not reachable" };
        }
    }
}

export const deleteData = async (url) => {
    const { data } = await axios.delete(process.env.NEXT_PUBLIC_APP_BASE_URL + url, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    })
    return data
}


