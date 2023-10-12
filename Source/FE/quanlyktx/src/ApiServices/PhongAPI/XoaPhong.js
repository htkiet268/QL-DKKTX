import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const XoaPhongService = () => {
    const { response: XoaPhongResponse,
        error: XoaPhongError,
        isLoading: XoaPhongIsLoading,
        axiosFetch: XoaPhongRefetch } = useAxiosFunction();

    const callXoaPhongRefetch = (idPhong) => {
        const XoaPhongUrl = `/api/rooms/${idPhong}`;

        XoaPhongRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaPhongUrl,
            requestConfig: { }
        })
    }


    return { XoaPhongResponse, XoaPhongIsLoading, XoaPhongError, callXoaPhongRefetch }
}


