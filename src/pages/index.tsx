import Head from 'next/head'
import { useRouter } from 'next/router';
import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <main>
                <>
                    <button type="button" onClick={() => router.push('/user/new')}>
                        Add User
                    </button>

                    <div> All users</div>
                    {
                        users.map(user => (
                            <div key={user.id}>
                                <div>
                                    <span>Email:</span>
                                    <span>{user.email}</span>
                                </div>
                                <div>
                                    <span>First Name:</span>
                                    <span>{user.firstName}</span>
                                </div>
                                <div>
                                    <span>Last Name:</span>
                                    <span>{user.lastName}</span>
                                </div>
                            </div>
                        ))
                    }
                </>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()

    return {props: {users}}
}

export default Home
