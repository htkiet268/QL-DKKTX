import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const XoaNhanVienService = () => {
    const { response: XoaNhanVienResponse,
        error: XoaNhanVienError,
        isLoading: XoaNhanVienIsLoading,
        axiosFetch: XoaNhanVienRefetch } = useAxiosFunction();

    const callXoaNhanVienRefetch = (idNV) => {
        const XoaNhanVienUrl = `/api/staffs/${idNV}`

        XoaNhanVienRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaNhanVienUrl,
            requestConfig: { }
        })
    }


    return { XoaNhanVienResponse, XoaNhanVienIsLoading, XoaNhanVienError, callXoaNhanVienRefetch }
}


