import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

import { CreateWorkSpaceModal } from "@/features/workspaces/components/create-workspace-modal";


const DashboardLayout = async ({children,}: {children: React.ReactNode;}) => {

    return (
        <div className="min-h-screen">
            <NuqsAdapter>

                <CreateWorkSpaceModal/>

                <div className="flex w-full h-full">
                    <div className=" fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                        {/* Sidebar */}
                        <Sidebar/>
                    </div>
                    <div className="lg:pl-[264px] w-full">
                        <div className=" mx-auto max-w-screen-2xl h-full ">
                            {/* Navbar */}
                            <Navbar/>

                            <main className=" h-full py-8 px-6 flex flex-col">
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </NuqsAdapter>

        </div>
    );
};

export default DashboardLayout;
