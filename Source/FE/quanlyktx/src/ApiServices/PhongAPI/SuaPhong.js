import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const SuaPhongService = () => {
    const { response: SuaNPhongResponse,
        error: SuaNPhongError,
        isLoading: SuaNPhongIsLoading,
        axiosFetch: SuaNPhongRefetch } = useAxiosFunction();

    const callSuaNPhongRefetch = (dataP) => {
        const idPhong = localStorage.getItem('idPhong');
        const SuaNPhongUrl = `/api/rooms/${idPhong}`

        SuaNPhongRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaNPhongUrl,
            requestConfig: { data: dataP }
        })
    }


    return { SuaNPhongResponse, SuaNPhongIsLoading, SuaNPhongError, callSuaNPhongRefetch }
}


