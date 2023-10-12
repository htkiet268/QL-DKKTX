import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const SuaSVService = () => {
    const { response: SuaNSVResponse,
        error: SuaNSVError,
        isLoading: SuaNSVIsLoading,
        axiosFetch: SuaNSVRefetch } = useAxiosFunction();

    const callSuaNSVRefetch = (idSV,dataSV) => {
        const SuaNSVUrl = `/api/students/${idSV}`

        SuaNSVRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaNSVUrl,
            requestConfig: { data: dataSV }
        })
    }


    return { SuaNSVResponse, SuaNSVIsLoading, SuaNSVError, callSuaNSVRefetch }
}


