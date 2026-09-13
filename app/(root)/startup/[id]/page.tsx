import { formatDate } from "@/lib/utils"
import { client, sanityFetch } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import Link from "next/link"
import { notFound } from "next/navigation"

const StartupDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params



  const post = await sanityFetch({
    query: STARTUP_BY_ID_QUERY,
    params: {id},
    revalidate: 60
  })

  if(!post) return notFound()

    console.log(post)
  return (
    <>
     <section className="pink_container min-h-57.5!">
      <p className="tag">
      {formatDate(post?._createdAt)}
      </p>
      <h1 className="heading">
          {post?.title}
      </h1>
      <p className="sub-heading max-w-5xl!">
        {post?.description}
      </p>
     </section>

     <section className="section_container">
      <img
      src={post?.image}
      alt="thumbnail"
      className="w-full h-auto rounded-xl"
      />  
      <div className="space-y-5 mt-10 max-w-4xl mg-x-auto">
        <div className="flex-between gap-5">
          <Link href={`/user/${post?.author?._id}`} >
          
          </Link>

        </div>
      </div>
     </section>
    </>
  )
}

export default StartupDetailPage