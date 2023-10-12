import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";




export const DuyetHopDongService = () => {
    const { response: DuyetHopDongResponse,
        error: DuyetHopDongError,
        isLoading: DuyetHopDongIsLoading,
        axiosFetch: DuyetHopDongRefetch } = useAxiosFunction();

    const callDuyetHopDong = (idHopDong,status) => {
        let idNV = localStorage.getItem('idNV');
        const DuyetHopDongUrl = `/api/contracts/changeStatus/${idHopDong}?status=${status}&staffId=${idNV}`;

        DuyetHopDongRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: DuyetHopDongUrl,
            requestConfig: {}
        })
    }


    return { DuyetHopDongResponse, DuyetHopDongIsLoading, DuyetHopDongError, callDuyetHopDong }
}


