import Head from 'next/head'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'

type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
}

function Home() {
  const router = useRouter()
  const { isLoading, isError, data, error } = trpc.user.all.useQuery()

  const handleClick = (user: User) => {
    router.push({
      pathname: `/user/update/${user.id}`,
      query: { user: JSON.stringify(user) },
    })
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (data) {
    const users = data ? data.users : []

    return (
      <>
        <Head>
          <title>Blogs</title>
        </Head>
        <main>
          <div className={'grid grid-rows-2 place-content-center'}>
            <div className={'grid grid-cols-2 place-content-center'}>
              <span className={'text-3xl font-bold'}> All users</span>
              <span className={'text-right'}>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => router.push('/user/new')}
                >
                  Add User
                </button>
              </span>
            </div>
            <table
              className={
                'border-collapse border border-slate-300 min-w-full items-center'
              }
            >
              <thead>
                <tr>
                  <th className={'border border-slate-300 px-6 py-4 border-r'}>
                    Email
                  </th>
                  <th className={'border border-slate-300 px-6 py-4 border-r'}>
                    Name
                  </th>
                  <th className={'w-100'}></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td
                      className={'border border-slate-300 px-6 py-4 border-r'}
                    >
                      {user.email}
                    </td>
                    <td
                      className={'border border-slate-300 px-6 py-4 border-r'}
                    >
                      {user.firstName + ' ' + user.lastName}
                    </td>
                    <td
                      className={'border border-slate-300 px-6 py-4 border-r'}
                    >
                      <button
                        type="button"
                        onClick={() => handleClick(user)}
                        className={
                          'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
