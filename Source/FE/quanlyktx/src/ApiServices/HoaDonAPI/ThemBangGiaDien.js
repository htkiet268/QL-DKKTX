import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const ThemBangGiaDienUrl = '/api/electric-tariffs'



export const ThemBangGiaDienService = () => {
    const { response: ThemBangGiaDienResponse,
        error: ThemBangGiaDienError,
        isLoading: ThemBangGiaDienIsLoading,
        axiosFetch: ThemBangGiaDienRefetch } = useAxiosFunction();

    const callThemBangGiaDienRefetch = (data) => {
       
        ThemBangGiaDienRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemBangGiaDienUrl,
            requestConfig: {data: data}
        })
    }  


    return { ThemBangGiaDienResponse, ThemBangGiaDienIsLoading, ThemBangGiaDienError, callThemBangGiaDienRefetch }
}


