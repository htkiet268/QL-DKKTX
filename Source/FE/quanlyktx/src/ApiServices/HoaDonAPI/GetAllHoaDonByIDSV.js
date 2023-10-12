import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";




export const GetHoaDonByIDSVService = () => {
    let idSV = localStorage.getItem('idNV');
    const GetHoaDonByIDSVUrl = `/api/invoices/getInvoiceByStudentID/${idSV}`;

    const { response: GetHoaDonSVResponse,
        isLoading: GetHoaDonSVLoading,
        error: GetHoaDonSVError,
        refetch: GetHoaDonByIDSVRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetHoaDonByIDSVUrl,
            requestConfig: {}
        });

    return { GetHoaDonSVResponse, GetHoaDonSVLoading, GetHoaDonSVError, GetHoaDonByIDSVRefetch }
}


