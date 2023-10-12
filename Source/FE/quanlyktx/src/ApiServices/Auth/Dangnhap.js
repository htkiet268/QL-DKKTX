import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const DangNhapUrl = '/api/auth/signin'



export const DangNhapService = () => {
    const { response: DangNhapResponse,
        error: DangNhapError,
        isLoading: DangNhapIsLoading,
        axiosFetch: DangNhapRefetch } = useAxiosFunction();

    const callDangNhapRefetch = (data) => {
       
        DangNhapRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: DangNhapUrl,
            requestConfig: {data: data}
        })
    }  


    return { DangNhapResponse, DangNhapIsLoading, DangNhapError, callDangNhapRefetch }
}


