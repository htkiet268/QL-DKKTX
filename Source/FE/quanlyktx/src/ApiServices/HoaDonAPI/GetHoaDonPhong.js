import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";




export const GetHoaDonPhongService = () => {
    let idSV = localStorage.getItem('idNV');
    const GetHoaDonPhongUrl = `/api/invoices/getInvoiceByStudentID/${idSV}`;

    const { response: GetHoaDonPhongSVResponse,
        isLoading: GetHoaDonPhongSVLoading,
        error: GetHoaDonPhongSVError,
        refetch: GetHoaDonPhongRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetHoaDonPhongUrl,
            requestConfig: {}
        });

    return { GetHoaDonPhongSVResponse, GetHoaDonPhongSVLoading, GetHoaDonPhongSVError, GetHoaDonPhongRefetch }
}


