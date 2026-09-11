import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}> }) {
  const query = (await searchParams).query
  console.log(query)
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

      </ul>
   </section>
   </>
  );
}
