import useAxios from '../../../Components/hooks/useAxios';

import httpClient from "../../../utils/axiosInstance";

const GetAllPhieuDienUrl = '/api/electric-bills';



export const GetAllPhieuDienService = () => {

    const { response: GetAllPhieuDienResponse,
        isLoading: GetAllPhieuDienLoading,
        error: GetPhieuDienError,
        refetch: GetAllPhieuDienRefetch } = useAxios({
            axiosInstance: httpClient,
            method: 'GET',
            url: GetAllPhieuDienUrl,
            requestConfig: {}
        });

    return { GetAllPhieuDienResponse, GetAllPhieuDienLoading, GetPhieuDienError, GetAllPhieuDienRefetch }
}


