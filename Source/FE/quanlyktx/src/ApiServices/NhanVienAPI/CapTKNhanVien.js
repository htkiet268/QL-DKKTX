import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const CapTKNhanVienUrl = '/api/staffs/registration'



export const CapTKNhanVienService = () => {
    const { response: CapTKNhanVienResponse,
        error: CapTKNhanVienError,
        isLoading: CapTKNhanVienIsLoading,
        axiosFetch: CapTKNhanVienRefetch } = useAxiosFunction();

    const callCapTKNhanVienRefetch = (dataNV) => {
       
        CapTKNhanVienRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: CapTKNhanVienUrl,
            requestConfig: {data: dataNV}
        })
    }  


    return { CapTKNhanVienResponse, CapTKNhanVienIsLoading, CapTKNhanVienError, callCapTKNhanVienRefetch }
}


