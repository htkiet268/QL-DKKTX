import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetAllGetAllBangGiaDienUrl = '/api/water-tariffs';



export const GetAllGetAllBangGiaDienService = () => {

    const { response: GetAllGetAllBangGiaDienResponse,
        isLoading: GetAllGetAllBangGiaDienLoading,
        error: GetGetAllBangGiaDienError,
        refetch: GetAllGetAllBangGiaDienRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllGetAllBangGiaDienUrl,
            requestConfig: {}
        });

    return { GetAllGetAllBangGiaDienResponse, GetAllGetAllBangGiaDienLoading, GetGetAllBangGiaDienError, GetAllGetAllBangGiaDienRefetch }
}


