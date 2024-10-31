import Sidebar from '../../../components/Sidebar'
import Navb from '../../../components/Navb'



export default async function RootLayout({children}) {
  return (
    <div className="flex">
        <Sidebar/>
       <div className="w-full h-full">
            <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
       </div>
    </div>
  );
}
