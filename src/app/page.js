
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContectUsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Homepage from "@/components/Homepage";
import OurProducts from "@/components/OurProducts";



export default function Home() {
  return (
    <div className=" 2xl:container 2xl:mx-auto overflow-x-hidden">
      <Homepage />
      <div id="featured-products" className="hidden md:block">
      <FeaturedProducts />
      </div>
      <div id="our-products" className="hidden md:block">
      <OurProducts />
      </div>
      <div id="about-us">
      <AboutUsSection />
      </div>
      <div id="contact-us">
      <ContactUsSection />
      </div>
    </div>
  );
}
