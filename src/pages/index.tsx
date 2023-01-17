import Head from 'next/head'
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <main>
                <button type="button" onClick={() => router.push('/blogs/new')}>
                    New
                </button>
            </main>
        </>
    )
}
