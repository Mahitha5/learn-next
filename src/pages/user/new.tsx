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
        <form onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" required onChange={(e) => setFirstName(e.target.value)}/>

            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" required onChange={(e) => setLastName(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>

            <button type="submit">Submit</button>
        </form>
    )
}