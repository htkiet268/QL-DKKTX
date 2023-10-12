import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllLoaiPhongVienUrl = '/api/roomtypes';



export const GetAllLoaiPhongService = () => {

    const { response: GetAllLoaiNPhongesponse,
        isLoading: GetAllLoaiNhPhongLoading,
        error: GetLoaiPhongenError,
        refetch: GetAllLoaiPhongRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllLoaiPhongVienUrl,
            requestConfig: {}
        });

    return { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetLoaiPhongenError, GetAllLoaiPhongRefetch }
}


