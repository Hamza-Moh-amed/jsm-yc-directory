import { sanityFetch } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import StartupCard from './StartupCard'

const UserStartups = async ({id}: {id: string}) => {

    const startups = await sanityFetch({query: STARTUPS_BY_AUTHOR_ID_QUERY, params: {id}, revalidate: 0})
    if(!startups) return notFound()

  return (
    <>
        {startups.length > 0 

        ? startups.map((startup) => (<StartupCard key={startup._id} post={startup} />)) 
        :<p className="no-result">No posts yet</p>
        }
    </>
  )
}

export default UserStartups