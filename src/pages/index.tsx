import Head from 'next/head'
import { useRouter } from 'next/router';
import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

type User = {
    id: number
    email: string,
    firstName: string | null,
    lastName: string | null
}

function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()

    const handleClick = (user: User) => {
        router.push({
            pathname: `/user/update/${user.id}`,
            query: { user: JSON.stringify(user) },
        })
    }

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

                                <button
                                    type="button"
                                    onClick={ () => handleClick(user)}
                                >
                                    Edit
                                </button>
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
