import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "~/libraries/swr.library";
import { Response } from "~/pages/api/playlist"

export interface Props extends SWRConfiguration {
    id: string;
}

export const usePlaylist = ({ id, ...config }: Props) => {

    const swr = useSWR<Response>("/api/playlist/" + id, fetcher, config);
    const isLoading = !swr.error && !swr.data;

    return {
        ...swr,
        data: swr.data?.data,
        isLoading
    };
}

export default usePlaylist;