import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllHoaDonUrl = '/api/invoices';



export const GetAllHoaDonService = () => {

    const { response: GetAllHoaDonResponse,
        isLoading: GetAllHoaDonLoading,
        error: GetHoaDonError,
        refetch: GetAllHoaDonRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllHoaDonUrl,
            requestConfig: {}
        });

    return { GetAllHoaDonResponse, GetAllHoaDonLoading, GetHoaDonError, GetAllHoaDonRefetch }
}


