
import { getCurrent } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <span className='text-3xl font-bold'>This is the main page</span>
      <span className='text-md'>Only visible to authorized users</span>

      <UserButton/>
      
    </div>
  )
}

export default HomePage