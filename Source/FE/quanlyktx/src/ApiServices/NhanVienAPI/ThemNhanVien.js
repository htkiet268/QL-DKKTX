import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const ThemNhanVienUrl = '/api/staffs'



export const ThemNhanVienService = () => {
    const { response: ThemNhanVienResponse,
        error: ThemNhanVienError,
        isLoading: ThemNhanVienIsLoading,
        axiosFetch: ThemNhanVienRefetch } = useAxiosFunction();

    const callThemNhanVienRefetch = (dataNV) => {
       
        ThemNhanVienRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemNhanVienUrl,
            requestConfig: {data: dataNV}
        })
    }  


    return { ThemNhanVienResponse, ThemNhanVienIsLoading, ThemNhanVienError, callThemNhanVienRefetch }
}


