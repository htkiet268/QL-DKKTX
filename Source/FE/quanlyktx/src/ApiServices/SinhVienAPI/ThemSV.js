import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";

const ThemSVUrl = '/api/students'



export const ThemSVService = () => {
    const { response: ThemSVResponse,
        error: ThemSVError,
        isLoading: ThemSVIsLoading,
        axiosFetch: ThemSVRefetch } = useAxiosFunction();

    const callThemSVRefetch = (dataSV) => {
       
        ThemSVRefetch({
            axiosInstance: httpClient,
            method: 'POST',
            url: ThemSVUrl,
            requestConfig: {data: dataSV}
        })
    }  


    return { ThemSVResponse, ThemSVIsLoading, ThemSVError, callThemSVRefetch }
}


