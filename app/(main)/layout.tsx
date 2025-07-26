import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      {children}
      <Footer />
    </>
  );
} 