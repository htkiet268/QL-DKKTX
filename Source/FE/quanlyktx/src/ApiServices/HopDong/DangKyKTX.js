import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const DangKyKTXUrl = '/api/contracts'



export const DangKyKTXService = () => {
    const { response: DangKyKTXResponse,
        error: DangKyKTXError,
        isLoading: DangKyKTXIsLoading,
        axiosFetch: DangKyKTXRefetch } = useAxiosFunction();

    const callDangKyKTXRefetch = (dataContract) => {
       
        DangKyKTXRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: DangKyKTXUrl,
            requestConfig: {data: dataContract}
        })
    }  


    return { DangKyKTXResponse, DangKyKTXIsLoading, DangKyKTXError, callDangKyKTXRefetch }
}


