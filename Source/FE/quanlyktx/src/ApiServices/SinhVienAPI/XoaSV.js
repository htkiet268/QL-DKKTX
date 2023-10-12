import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const XoaSVService = () => {
    const { response: XoaSVResponse,
        error: XoaSVError,
        isLoading: XoaSVIsLoading,
        axiosFetch: XoaSVRefetch } = useAxiosFunction();

    const callXoaSVRefetch = (idSV) => {
        const XoaSVUrl = `/api/students/${idSV}`;

        XoaSVRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaSVUrl,
            requestConfig: { }
        })
    }


    return { XoaSVResponse, XoaSVIsLoading, XoaSVError, callXoaSVRefetch }
}


