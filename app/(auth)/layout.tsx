import "../globals.css";

import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  min-h-[90%]">
     
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
