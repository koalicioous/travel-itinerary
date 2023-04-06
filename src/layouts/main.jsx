import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const MainLayout = ({ children, withFooter = true }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1024px] mb-12 px-6 lg:px-0">
        {children}
      </div>
      {withFooter && <Footer />}
    </>
  );
};

export default MainLayout;
