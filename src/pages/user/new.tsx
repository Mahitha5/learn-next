export default function NewUser() {
    return (
        <form action="/api/user" method="post">
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