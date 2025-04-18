
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className=''>
      Home Page
      
    </div>
  )
}

export default HomePage