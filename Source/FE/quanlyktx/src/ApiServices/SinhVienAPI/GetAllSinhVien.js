import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllSinhVienVienUrl = '/api/students';



export const GetAllSinhVienService = () => {

    const { response: GetAllSinhVienResponse,
        isLoading: GetSinhVienLoading,
        error: GetSinhVienError,
        refetch: GetAllSinhVienRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllSinhVienVienUrl,
            requestConfig: {}
        });

    return { GetAllSinhVienResponse, GetSinhVienLoading, GetSinhVienError, GetAllSinhVienRefetch }
}


