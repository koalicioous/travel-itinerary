import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1024px] mb-[200px]">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
