import useAxiosFunction from "../../Components/hooks/useAxiosFunction";

import httpClient from "../../utils/axiosInstance";


export const XoaBangGiaService = () => {
    const { response: XoaBangGiaResponse,
        error: XoaBangGiaError,
        isLoading: XoaBangGiaIsLoading,
        axiosFetch: XoaBangGiaRefetch } = useAxiosFunction();

    const callXoaBangGiaRefetch = (idBangGia) => {
        const XoaBangGiaUrl = `/api/electric-tariffs/${idBangGia}`;

        XoaBangGiaRefetch({
            axiosInstance: httpClient,
            method: 'DELETE',
            url: XoaBangGiaUrl,
            requestConfig: { }
        })
    }


    return { XoaBangGiaResponse, XoaBangGiaIsLoading, XoaBangGiaError, callXoaBangGiaRefetch }
}


