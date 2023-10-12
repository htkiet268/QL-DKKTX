import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllNhanVienUrl = '/api/staffs';



export const GetAllNhanVienService = () => {

    const { response: GetAllNhanVienResponse,
        isLoading: GetAllNhanVienIsLoading,
        error: GetAllNhanVienError,
        refetch: GetAllNhanVienRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllNhanVienUrl,
            requestConfig: {}
        });

    return { GetAllNhanVienResponse, GetAllNhanVienIsLoading, GetAllNhanVienError, GetAllNhanVienRefetch }
}


