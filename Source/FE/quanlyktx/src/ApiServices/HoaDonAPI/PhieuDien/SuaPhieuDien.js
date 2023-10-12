import useAxiosFunction from '../../../Components/hooks/useAxiosFunction'

import httpClient from "../../../utils/axiosInstance";




export const SuaPhieuDienService = () => {
    const { response: SuaPhieuDienResponse,
        error: SuaPhieuDienError,
        isLoading: SuaPhieuDienIsLoading,
        axiosFetch: SuaPhieuDienRefetch } = useAxiosFunction();
        
        const callSuaPhieuDienRefetch = (data,id) => {
        const SuaPhieuDienUrl = `/api/electric-bills/${id}`
       
        SuaPhieuDienRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaPhieuDienUrl,
            requestConfig: {data: data}
        })
    }  


    return { SuaPhieuDienResponse, SuaPhieuDienIsLoading, SuaPhieuDienError, callSuaPhieuDienRefetch }
}


