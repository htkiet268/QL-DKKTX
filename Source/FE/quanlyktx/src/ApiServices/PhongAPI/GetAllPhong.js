import useAxios from '../../Components/hooks/useAxios';

import httpClient from "../../utils/axiosInstance";

const GetPhongVienUrl = '/api/rooms';



export const GetAllPhongService = () => {

    const { response: GetAllNPhongesponse,
        isLoading: GetAllNhPhongLoading,
        error: GetAPhongenError,
        refetch: GetAllPhongRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetPhongVienUrl,
            requestConfig: {}
        });

    return { GetAllNPhongesponse, GetAllNhPhongLoading, GetAPhongenError, GetAllPhongRefetch }
}


