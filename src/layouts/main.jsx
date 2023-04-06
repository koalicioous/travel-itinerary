import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1024px] mb-12 px-6 lg:px-0">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
