import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function UpdateUser() {
    const router = useRouter()
    const { user } = router.query

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
        const res = await fetch('/api/user', {
            method: "PUT",
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName
            })
        })

        const data = await res.json()

        if (res.status !== 200) {
            throw new Error(data.message)
        }
        router.push('/')
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
