import useAxiosFunction from '../../../Components/hooks/useAxiosFunction'

import httpClient from "../../../utils/axiosInstance";




export const ThanhToanPhieuNuocService = () => {
    const { response: ThanhToanPhieuNuocResponse,
        error: ThanhToanPhieuNuocError,
        isLoading: ThanhToanPhieuNuocIsLoading,
        axiosFetch: ThanhToanPhieuNuocRefetch } = useAxiosFunction();

    const callThanhToanPhieuNuocRefetch = () => {
        let idHDon = localStorage.getItem('idPhieuNuoc');
        const ThanhToanPhieuNuocUrl = `/api/water-bills/payment/${idHDon}`;

        ThanhToanPhieuNuocRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: ThanhToanPhieuNuocUrl,
            requestConfig: {}
        })
    }


    return { ThanhToanPhieuNuocResponse, ThanhToanPhieuNuocIsLoading, ThanhToanPhieuNuocError, callThanhToanPhieuNuocRefetch }
}


