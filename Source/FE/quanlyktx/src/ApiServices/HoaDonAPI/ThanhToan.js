import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";




export const ThanhToanService = () => {
    const { response: ThanhToanResponse,
        error: ThanhToanError,
        isLoading: ThanhToanIsLoading,
        axiosFetch: ThanhToanRefetch } = useAxiosFunction();

    const callThanhToanRefetch = () => {
        let idHDon = localStorage.getItem('idHoaDon');
        const ThanhToanUrl = `/api/invoices/payment/${idHDon}`;

        ThanhToanRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: ThanhToanUrl,
            requestConfig: {}
        })
    }


    return { ThanhToanResponse, ThanhToanIsLoading, ThanhToanError, callThanhToanRefetch }
}


