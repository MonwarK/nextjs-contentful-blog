import { client } from "../src/utilities/contenful.utilitiy";
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"

export default function BlogId({blogs, blog}) {
  return (
    <div className="bg-gray-100">
      <div className="relative h-[450px]">
        <Image className="bg-filter brightness-50 absolute" src={`https:${blog.heroImage.fields.file.url}`} objectFit="cover" layout="fill" />
        
        <div className="relative max-w-screen-lg mx-auto h-full p-2">
          <div className="z-50 absolute text-white bottom-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{blog.title}</h1>
            <p className="font-medium">{new Date(blog.publishDate).toUTCString()}</p>
          </div>
        </div>
      </div>
      <article className="prose prose-xl max-w-screen-lg my-10 mx-auto p-2">
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </article>

      <div className="max-w-screen-lg mx-auto py-8">
        <h4 className="text-3xl font-semibold mb-4 text-center">Read More</h4>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, i) => (
            <div key={i.toString()} className="bg-white px-10 py-6 rounded-2xl shadow-md group cursor-pointer">
              <Link href={`/${blog.fields.slug}`}>
                <div>
                  <div className="w-full relative h-64">
                    <Image 
                      src={`https:${blog.fields.heroImage.fields.file.url}`} 
                      alt="games" 
                      objectFit="cover" 
                      layout="fill" 
                    />
                  </div>
                  <div className="py-2 px-4 w-full flex justify-between bg-indigo-700">
                    <p className="text-sm text-white font-semibold tracking-wide">{blog.fields.author.fields.name}</p>
                    <p className="text-sm text-white font-semibold tracking-wide">{new Date(blog.fields.publishDate).toUTCString()}</p>
                  </div>
                  <div className="bg-white py-4 rounded-bl-3xl rounded-br-3xl">
                    <h1 className="text-lg text-gray-900 font-semibold tracking-wider group-hover:underline">{blog.fields.title}</h1>
                    <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">{blog.fields.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export async function getStaticPaths() {
  const blogs = await client.getEntries({ content_type: "blogPost" })
  
  const paths = blogs.items.map((blog) => ({
    params: {
      id: blog.fields.slug
    }
  }))

  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({ content_type: "blogPost" }).then((res) => res.items)
  const blog = res.find((blog) => blog.fields.slug === params.id)
  const blogs = res.filter((item) => item.fields.slug != params.id)

  return {
    props: {
      blogs,
      blog: blog.fields
    },
  }
}