import {trpc} from "../../utils/trpc";
import {useRouter} from "next/router";

export default function NewUser() {
    const router = useRouter()
    const addUserMutation = trpc.user.add.useMutation()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        addUserMutation.mutate({
            email: event.target["email"].value,
            firstName: event.target["firstname"].value,
            lastName: event.target["lastname"].value
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
            <input type="text" id="firstname" name="firstname" required />

            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" required />

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />

            <button type="submit">Submit</button>
        </form>
    )
}