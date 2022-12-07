import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Container, Layout } from "~/components";
import usePlaylist from "~/hooks/usePlaylist.hook";
import { getAllIds, getPlaylistById } from "~/libraries/api.library";
import dbConnect from "~/libraries/mongoose.library";
import { NextPageWithLayout } from "~/types/common.types";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    await dbConnect();
    const id = ctx?.params?.id?.toString();
    const data = await getPlaylistById(id);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            id: data.id,
            fallbackData: {
                data
            }
        },
        revalidate: 60 * 5
    };
};

export const getStaticPaths = async () => {
    await dbConnect();
    const ids = await getAllIds();

    const paths = ids.map((id) => {
        return {
            params: {
                id
            }
        };
    });

    return {
        paths,
        fallback: true
    };
}

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Playlist: NextPageWithLayout<Props> = ({ id, fallbackData }) => {
    const { data, isLoading } = usePlaylist({
        id,
        fallbackData,
        revalidateOnMount: false
    });

    return (
        <>
            <Head>
                <title>DaftAcademy - lista</title>
            </Head>

            <Container>
                {<div>PlaylistId: {id} </div>}
            </Container>
        </>
    );
}

export default Playlist;

Playlist.getLayout = (page) => {
    return <Layout>{page}</Layout>;
}