import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const ThemPhongUrl = '/api/rooms'



export const ThemPhongService = () => {
    const { response: ThemPhongResponse,
        error: ThemPhongError,
        isLoading: ThemPhongIsLoading,
        axiosFetch: ThemPhongRefetch } = useAxiosFunction();

    const callThemPhongRefetch = (dataNV) => {
       
        ThemPhongRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemPhongUrl,
            requestConfig: {data: dataNV}
        })
    }  


    return { ThemPhongResponse, ThemPhongIsLoading, ThemPhongError, callThemPhongRefetch }
}


