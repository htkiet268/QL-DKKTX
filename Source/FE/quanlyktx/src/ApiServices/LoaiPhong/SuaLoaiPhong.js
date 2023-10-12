import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const SuaLoaiPhongService = () => {
    const { response: SuaLoaiPhongResponse,
        error: SuaLoaiPhongError,
        isLoading: SuaLoaiPhongIsLoading,
        axiosFetch: SuaLoaiPhongRefetch } = useAxiosFunction();

    const callSuaLoaiPhongRefetch = (dataLoaiP) => {
        const idLoaiPhong = localStorage.getItem('idLoaiPhong');
        const SuaLoaiPhongUrl = `/api/roomtypes/${idLoaiPhong}`

        SuaLoaiPhongRefetch({
            axiosInstance: httpClient,
            method: 'PUT',
            url: SuaLoaiPhongUrl,
            requestConfig: { data: dataLoaiP }
        })
    }


    return { SuaLoaiPhongResponse, SuaLoaiPhongIsLoading, SuaLoaiPhongError, callSuaLoaiPhongRefetch }
}


