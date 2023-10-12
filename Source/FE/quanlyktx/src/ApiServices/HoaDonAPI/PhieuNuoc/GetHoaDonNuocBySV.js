import useAxios from '../../../Components/hooks/useAxios';

import httpClient from "../../../utils/axiosInstance";




export const GetHoaDonNuocBySVService = () => {
    const idSV = localStorage.getItem('idNV');
    const GetHoaDonNuocBySVUrl = `/api/water-bills/student/${idSV}`;
    const { response: GetHoaDonNuocBySVResponse,
        isLoading: GetHoaDonNuocBySVLoading,
        error: GetPhieuNuocBySVError,
        refetch: GetHoaDonNuocBySVRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetHoaDonNuocBySVUrl,
            requestConfig: {}
        });

    return { GetHoaDonNuocBySVResponse, GetHoaDonNuocBySVLoading, GetPhieuNuocBySVError, GetHoaDonNuocBySVRefetch }
}


