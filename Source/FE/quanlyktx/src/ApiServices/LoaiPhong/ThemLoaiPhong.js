import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const ThemLoaiPhongUrl = '/api/roomtypes'



export const ThemLoaiPhongService = () => {
    const { response: ThemLoaiPhongResponse,
        error: ThemLoaiPhongError,
        isLoading: ThemLoaiPhongIsLoading,
        axiosFetch: ThemLoaiPhongRefetch } = useAxiosFunction();

    const callThemLoaiPhongRefetch = (dataNV) => {
       
        ThemLoaiPhongRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemLoaiPhongUrl,
            requestConfig: {data: dataNV}
        })
    }  


    return { ThemLoaiPhongResponse, ThemLoaiPhongIsLoading, ThemLoaiPhongError, callThemLoaiPhongRefetch }
}


