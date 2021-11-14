import { client } from "../src/utilities/contenful.utilitiy"
import Link from "next/link"

export default function Home({ blogs }) {
  console.log(blogs)
  return (
    <div className="2xl:mx-auto 2xl:container lg:py-16 lg:px-40 xl:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold leading-9 text-gray-800">Latest Blog</h1>
        <p className="text-base leading-6 text-center text-gray-600 sm:w-96 md:w-9/12 lg:w-5/12 mt-4">If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 md:gap-6 gap-4 lg:mt-12 md:mt-9 mt-6">
        {blogs.map((blog) => (
          <div className="relative flex items-center justify-center">
            <img className="filter brightness-50 h-96 object-cover w-full" src={blog.fields.heroImage.fields.file.url} alt={blog.fields.heroImage.fields.description} />
            <div className="absolute top-0 flex flex-col w-80 md:w-80 lg:w-80 xl:w-96 h-full items-center justify-between py-10">
              <div className="flex items-center justify-center flex-col h-full">
                <h2 className="xl:px-10 md:px-2 px-7 text-2xl font-semibold sm:w-auto leading-normal text-center text-white">{blog.fields.title}</h2>
                <p className="xl:px-10 md:px-2 px-7 text-base leading-normal text-center text-white mt-4">{blog.fields.description}</p>
              </div>
              <div className="px-4 md:w-auto w-full">
                <Link href={`/${blog.fields.slug}`}>
                  <button className="w-full hover:bg-gray-300 transition duration-150 text-base font-medium leading-none text-center text-gray-800 py-4 px-12 bg-white focus:outline-none">Read more</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const blogs = await client.getEntries({content_type: "blogPost"}).then((res) => res.items)

  return {
    props: {
      blogs
    }
  }
}