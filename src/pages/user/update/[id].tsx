import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {trpc} from "../../../utils/trpc"

export default function UpdateUser() {
    const router = useRouter()
    const { user } = router.query
    const updateMutation = trpc.user.update.useMutation()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (typeof user === "string") {
            const parsedUser = JSON.parse(user)
            setFirstName(parsedUser.firstName)
            setLastName(parsedUser.lastName)
            setEmail(parsedUser.email)
        }
    }, [user])

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        updateMutation.mutate({
            email: email,
            firstName: firstName,
            lastName: lastName
        })
    }

    if (updateMutation.isLoading) {
        return <div>Im still loading</div>
    }

    if (updateMutation.isSuccess) {
        router.push('/')
    }

    if (updateMutation.isError) {
        return <div>Something went wrong</div>
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>

            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={lastName} required onChange={(e) => setLastName(e.target.value)}/>

            <button type="submit">Submit</button>
        </form>
    )
}
