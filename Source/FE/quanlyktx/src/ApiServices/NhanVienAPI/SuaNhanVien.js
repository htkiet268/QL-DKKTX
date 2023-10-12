import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const SuaNhanVienService = () => {
    const { response: SuaNhanVienResponse,
        error: SuaNhanVienError,
        isLoading: SuaNhanVienIsLoading,
        axiosFetch: SuaNhanVienRefetch } = useAxiosFunction();

    const callSuaNhanVienRefetch = (dataNV, idNV) => {
        const SuaNhanVienUrl = `/api/staffs/${idNV}`

        SuaNhanVienRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaNhanVienUrl,
            requestConfig: { data: dataNV }
        })
    }


    return { SuaNhanVienResponse, SuaNhanVienIsLoading, SuaNhanVienError, callSuaNhanVienRefetch }
}


