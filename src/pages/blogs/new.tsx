export default function NewBlog() {
  return (
    <form action="/api/blog" method="post">
      <label htmlFor="name">Author Name</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="content">Content</label>
      <input type="text" id="content" name="content" required />

      <button type="submit">Submit</button>
    </form>
  )
}
