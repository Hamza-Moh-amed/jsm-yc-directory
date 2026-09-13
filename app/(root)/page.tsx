import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { StartupCardType } from "@/types";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}> }) {
  const query = (await searchParams).query


  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: {_id: 1, name: "David.S.Junior"},
    _id: 1,
    description: "This is a desc",
    image: "/logo.png",
    category: "Robots",
    title: "We Robots"
  }]


  return (
   <>
   <section className="pink_container">
     <h1 className="heading">
       Pitch Your startup, <br /> Connect with entrepreneurs
     </h1>
     <p className="sub-heading max-w-3xl!">
      Submit Ideas, Vote on Pitchers, and get noticed in virtual competions.
     </p>
     <SearchForm query={query} />
   </section>
   <section className="section_container">
    <p className="text-30-semibold">
      {query ? `Search Results for: ${query}` : `All Startups`}
    </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: StartupCardType, index: number) => (
            <StartupCard key={post._id} post={post} />
          ))
        ): 
        (
          <p className="no-results">
            No Startupsfound
          </p>
        )
        }
      </ul>
   </section>
   </>
  );
}
