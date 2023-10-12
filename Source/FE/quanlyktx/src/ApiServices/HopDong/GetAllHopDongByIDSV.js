import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";




export const GetHopDongByIDSVService = () => {
    let idSV = localStorage.getItem('idNV');
    const GetHopDongByIDSVUrl = `/api/contracts/${idSV}`;

    const { response: GetHopDongSVResponse,
        isLoading: GetHopDongSVLoading,
        error: GetHopDongSVError,
        refetch: GetHopDongByIDSVRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetHopDongByIDSVUrl,
            requestConfig: {}
        });

    return { GetHopDongSVResponse, GetHopDongSVLoading, GetHopDongSVError, GetHopDongByIDSVRefetch }
}


