import Ping from './Ping'
import {  sanityFetch } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({id}: {id: string}) => {


    const result = await sanityFetch({query: STARTUP_VIEWS_QUERY, params: {id}, revalidate: 0})
    const totalViews = result?.views ?? 0


    
    after(async () => {
      await writeClient.patch(id).set({views: totalViews + 1}).commit()
    })

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
        <Ping />
        </div>

        <p className='view-text'>
            <span className='font-black'>{totalViews} {totalViews && totalViews < 2 ? "View" : "Views"}</span>
        </p>
        </div>
  )
}

export default View