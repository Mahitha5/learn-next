import {trpc} from "../../utils/trpc";
import {useRouter} from "next/router";
import {useState} from "react";

export default function NewUser() {
    const router = useRouter()
    const addUserMutation = trpc.user.add.useMutation()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        addUserMutation.mutate({
            email: email,
            firstName: firstName,
            lastName: lastName
        });
    }

    if (addUserMutation.isLoading) {
        return <div>Im still loading</div>
    }

    if (addUserMutation.isSuccess) {
        router.push('/')
    }

    if (addUserMutation.isError) {
        return <div>Something went wrong</div>
    }

    return (
        <div className={"flex flex-col place-items-center m-20"}>
            <form onSubmit={(event) => handleSubmit(event)}
                  className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-50"}>
                <label htmlFor="firstname" className={"block text-gray-700 text-sm font-bold mb-2"}>First Name</label>
                <input type="text" id="firstname" name="firstname" required
                       onChange={(e) => setFirstName(e.target.value)}
                       className={"shadow appearance-none border rounded py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>

                <label htmlFor="lastname" className={"block text-gray-700 text-sm font-bold mb-2 pt-5"}>Last
                    Name</label>
                <input type="text" id="lastname" name="lastname" required onChange={(e) => setLastName(e.target.value)}
                       className={"shadow appearance-none border rounded py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>

                <label htmlFor="email" className={"block text-gray-700 text-sm font-bold mb-2 pt-5"}>Email</label>
                <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}
                       className={"shadow appearance-none border rounded py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}/>

                <div className={"text-center"}>
                    <button type="submit"
                            className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"}>Submit
                    </button>
                </div>
            </form>
        </div>
    )
}