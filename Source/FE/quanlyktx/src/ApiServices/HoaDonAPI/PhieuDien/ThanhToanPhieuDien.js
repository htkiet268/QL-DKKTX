import useAxiosFunction from '../../../Components/hooks/useAxiosFunction'

import httpClient from "../../../utils/axiosInstance";




export const ThanhToanPhieuDienService = () => {
    const { response: ThanhToanPhieuDienResponse,
        error: ThanhToanPhieuDienError,
        isLoading: ThanhToanPhieuDienIsLoading,
        axiosFetch: ThanhToanPhieuDienRefetch } = useAxiosFunction();

    const callThanhToanPhieuDienRefetch = () => {
        let idHDon = localStorage.getItem('idPhieuDien');
        const ThanhToanPhieuDienUrl = `/api/electric-bills/payment/${idHDon}`;

        ThanhToanPhieuDienRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: ThanhToanPhieuDienUrl,
            requestConfig: {}
        })
    }


    return { ThanhToanPhieuDienResponse, ThanhToanPhieuDienIsLoading, ThanhToanPhieuDienError, callThanhToanPhieuDienRefetch }
}


