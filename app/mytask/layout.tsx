import "../globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  min-h-[90%]">
     
      <main className="flex-1">{children}</main>
     
    </div>
  );
}
