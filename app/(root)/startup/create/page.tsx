import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"

const CreateStartupPage = async () => {
  const session = await auth()
  if(!session) redirect("/")
    
  return (
    <>
    <section className='pink_container min-h-57.5!'>
        <h1 className='heading'>Submit your Startup</h1>
    </section>


    <StartupForm />
    </>
  )
}

export default CreateStartupPage