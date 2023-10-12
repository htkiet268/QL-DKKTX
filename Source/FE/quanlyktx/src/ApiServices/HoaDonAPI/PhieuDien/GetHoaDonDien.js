import useAxios from '../../../Components/hooks/useAxios';

import httpClient from "../../../utils/axiosInstance";




export const GetHoaDonDienService = () => {
    const idSV = localStorage.getItem('idNV');
    const GetHoaDonDienUrl = `/api/electric-bills/student/${idSV}`;
    const { response: GetHoaDonDienResponse,
        isLoading: GetHoaDonDienLoading,
        error: GetPhieuDienError,
        refetch: GetHoaDonDienRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetHoaDonDienUrl,
            requestConfig: {}
        });

    return { GetHoaDonDienResponse, GetHoaDonDienLoading, GetPhieuDienError, GetHoaDonDienRefetch }
}


