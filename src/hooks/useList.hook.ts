import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "~/libraries/swr.library";
import { ModelWithId } from "~/models/Playlist.model";
import { Response } from "~/pages/api/playlist"

export interface Props extends SWRConfiguration {
    limit: string | number;
};

export const useList = ({ limit, ...config }: Props) => {

    const swr = useSWR<Response>(`/api/playlist?limit=${limit}`, fetcher, config);
    const isLoading = !swr.error && !swr.data;

    return {
        ...swr,
        data: swr.data?.data as ModelWithId[],
        isLoading
    };
};

export default useList;