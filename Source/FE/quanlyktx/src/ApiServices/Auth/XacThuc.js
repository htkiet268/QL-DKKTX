import useAxiosFunction from '../../Components/hooks/useAxiosFunction'

import httpClient from "../../utils/axiosInstance";




export const XacThucService = () => {
    const { response: XacThucResponse,
        error: XacThucError,
        isLoading: XacThucIsLoading,
        axiosFetch: XacThucRefetch } = useAxiosFunction();

    const callXacThucRefetch = (token) => {
        const XacThucUrl = `/api/auth/registrationConfirm?token=${token}`;
        console.log('====================================');
        console.log(XacThucUrl);
        console.log('====================================');
        XacThucRefetch({
            axiosInstance: httpClient,
            method: 'GET',
            url: XacThucUrl,
            requestConfig: {}
        })
    }


    return { XacThucResponse, XacThucIsLoading, XacThucError, callXacThucRefetch }
}


