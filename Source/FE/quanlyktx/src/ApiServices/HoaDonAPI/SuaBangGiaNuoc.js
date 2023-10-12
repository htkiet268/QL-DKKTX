import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";




export const SuaBangGiaDienService = () => {
    const { response: SuaBangGiaDienResponse,
        error: SuaBangGiaDienError,
        isLoading: SuaBangGiaDienIsLoading,
        axiosFetch: SuaBangGiaDienRefetch } = useAxiosFunction();
        
        const callSuaBangGiaDienRefetch = (data,id) => {
        const SuaBangGiaDienUrl = `/api/water-tariffs/${id}`
       
        SuaBangGiaDienRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaBangGiaDienUrl,
            requestConfig: {data: data}
        })
    }  


    return { SuaBangGiaDienResponse, SuaBangGiaDienIsLoading, SuaBangGiaDienError, callSuaBangGiaDienRefetch }
}


