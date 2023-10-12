import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllHopDongUrl = '/api/contracts';



export const GetAllHopDongService = () => {

    const { response: GetAllLoaiNPhongesponse,
        isLoading: GetAllLoaiNhPhongLoading,
        error: GetLoaiPhongenError,
        refetch: GetAllHopDongRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllHopDongUrl,
            requestConfig: {}
        });

    return { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetLoaiPhongenError, GetAllHopDongRefetch }
}


