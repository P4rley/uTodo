import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] relative bg-[#f2f2f2]">
      <div className="fixed top-0 w-[100px] md:w-[250px] lg:w-[300px] p-2">
        <Sidebar />
      </div>
      <div className="pl-[110px] md:pl-[260px] lg:pl-[310px] h-dvh p-2 w-screen ">
        {children}
      </div>
    </div>
  );
}
