'use client';
import { postData } from "@/utils/api";
import { useState } from "react";
import { TbArrowUpRight } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }

    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }


    await postData("/api/contact", formData).then((res) => {
      if (res.error !== true) {
        toast.success(res.msg || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error(res.msg || "Something went wrong!");
      }
    });
  };

  return (
    <div className="px-6 py-6 sm:py-10 lg:px-8 bg-white">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="mx-auto max-w-xl text-center text-[#6c4722]">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Angira
        </h2>
        <p className="mt-2 text-lg leading-8 font-semibold text-muted-foreground">
          Please feel free to ask anything
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-y-4">
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-full border-2 border-[#6c4722] bg-transparent px-8 py-2 text-md placeholder-[#6c4722] font-semibold"
            />
          </div>

          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-full border-2 border-[#6c4722] bg-transparent px-8 py-2 text-md placeholder-[#6c4722] font-semibold"
            />
          </div>

          <div className="mt-2.5">
            <textarea
              name="message"
              placeholder="Type Your Message Here..."
              value={formData.message}
              onChange={handleChange}
              className="flex w-full rounded-[30px] border-2 border-[#6c4722] bg-transparent px-6 py-4 text-md h-[150px] placeholder-[#6c4722] font-semibold"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-full px-8 py-3 font-bold text-white shadow-lg hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2"
            style={{ backgroundColor: "#6c4722" }}
          >
            Send <TbArrowUpRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;


