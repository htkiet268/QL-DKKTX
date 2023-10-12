import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const XoaLoaiPhongService = () => {
    const { response: XoaLoaiPhongResponse,
        error: XoaLoaiPhongError,
        isLoading: XoaLoaiPhongIsLoading,
        axiosFetch: XoaLoaiPhongRefetch } = useAxiosFunction();

    const callXoaLoaiPhongRefetch = (idLoaiPhong) => {
        const XoaLoaiPhongUrl = `/api/roomtypes/${idLoaiPhong}`;

        XoaLoaiPhongRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaLoaiPhongUrl,
            requestConfig: { }
        })
    }


    return { XoaLoaiPhongResponse, XoaLoaiPhongIsLoading, XoaLoaiPhongError, callXoaLoaiPhongRefetch }
}


