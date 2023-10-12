import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const DangKyUrl = '/api/auth/registration'



export const DangKyService = () => {
    const { response: DangKyResponse,
        error: DangKyError,
        isLoading: DangKyIsLoading,
        axiosFetch: DangKyRefetch } = useAxiosFunction();

    const callDangKyRefetch = (data) => {
       console.log('====================================');
       console.log(data);
       console.log('====================================');
        DangKyRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: DangKyUrl,
            requestConfig: {data: data}
        })
    }  


    return { DangKyResponse, DangKyIsLoading, DangKyError, callDangKyRefetch }
}


