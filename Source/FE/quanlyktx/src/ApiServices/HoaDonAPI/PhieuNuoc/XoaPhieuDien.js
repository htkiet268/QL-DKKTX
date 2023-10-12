import useAxiosFunction from "../../../Components/hooks/useAxiosFunction";

import httpClient from "../../../utils/axiosInstance";


export const XoaPhieuDienService = () => {
    const { response: XoaPhieuDienResponse,
        error: XoaPhieuDienError,
        isLoading: XoaPhieuDienIsLoading,
        axiosFetch: XoaPhieuDienRefetch } = useAxiosFunction();

    const callXoaPhieuDienRefetch = (idPhieuNuoc) => {
        const XoaPhieuDienUrl = `/api/water-bills/${idPhieuNuoc}`;

        XoaPhieuDienRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaPhieuDienUrl,
            requestConfig: { }
        })
    }


    return { XoaPhieuDienResponse, XoaPhieuDienIsLoading, XoaPhieuDienError, callXoaPhieuDienRefetch }
}


