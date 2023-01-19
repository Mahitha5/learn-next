import Head from 'next/head'
import { useRouter } from 'next/router';
import { trpc } from "../utils/trpc"

type User = {
    id: number
    email: string,
    firstName: string | null,
    lastName: string | null
}

function Home() {
    const router = useRouter()
    const {isLoading, isError, data, error} = trpc.user.all.useQuery();

    const handleClick = (user: User) => {
        router.push({
            pathname: `/user/update/${user.id}`,
            query: { user: JSON.stringify(user) },
        })
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    if(data) {
        const users = data ? data.users : []

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
                                        onClick={() => handleClick(user)}
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
    return <span>Loading...</span>
}

// export async function getServerSideProps() {
//     // const prisma = new PrismaClient()
//     // const users = await prisma.user.findMany()
//     //
//     // return {props: {users}}
//
//     // console.log("first comig here")
//     // // const postQuery = trpc.user.all.useQuery();
//     // console.log("feched data")
//     //
//     // if (postQuery.error) {
//     //     // return (
//     //     //     <NextError
//     //     //         title={postQuery.error.message}
//     //     //         statusCode={postQuery.error.data?.httpStatus ?? 500}
//     //     //     />
//     //     // );
//     // }
//     //
//     // if (postQuery.status !== 'success') {
//     //     return <>Loading...</>;
//     // }
//     // const { data } = postQuery;
//     // console.log("ha ha")
//     // console.log(data)
//     // return { props: data }
// }

export default Home
