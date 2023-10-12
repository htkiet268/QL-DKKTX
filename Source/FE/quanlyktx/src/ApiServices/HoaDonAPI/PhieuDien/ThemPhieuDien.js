import useAxiosFunction from '../../../Components/hooks/useAxiosFunction'

import httpClient from "../../../utils/axiosInstance";

const ThemPhieuDienUrl = '/api/electric-bills'



export const ThemPhieuDienService = () => {
    const { response: ThemPhieuDienResponse,
        error: ThemPhieuDienError,
        isLoading: ThemPhieuDienIsLoading,
        axiosFetch: ThemPhieuDienRefetch } = useAxiosFunction();

    const callThemPhieuDienRefetch = (data) => {
       
        ThemPhieuDienRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemPhieuDienUrl,
            requestConfig: {data: data}
        })
    }  


    return { ThemPhieuDienResponse, ThemPhieuDienIsLoading, ThemPhieuDienError, callThemPhieuDienRefetch }
}


