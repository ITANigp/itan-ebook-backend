import Header from "@/components/Header";
import React from "react";

const Help = () => {
  return (
    <section className="px-4 py-10 large:py-4 xl:py-0 xl:px-8">
      <Header/>

      <article className="w-full mt-10 xl:max-w-7xl xl:mx-auto">
        <div className="rounded-lg overflow-hidden bg-[#FEE6E6] bg-opacity-30">
          <h3 className="text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center large:text-left xl:text-left mb-6">
            Are you <span className="text-[#EF5353]">New?</span>
            Here are a few steps to get you started:
          </h3>

          <div>
            <h3>What is IGP</h3>
            <p>Know all about IGP service</p>
            <a href="#" />
          </div>
          <img />
        </div>
      </article>
    </section>
  );
};

export default Help;
