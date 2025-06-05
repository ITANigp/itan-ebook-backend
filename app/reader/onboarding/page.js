import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen bg-black text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="/books-background.jpg"
          alt="Books background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Header and CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="absolute top-6 left-6 text-4xl font-bold text-red-600">
          ITAN
        </div>
        <div className="absolute top-6 right-6">
          <button className="bg-red-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-700 transition">
            Sign Up
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Home of Black Fiction Novels
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Explore the richest collection of black fiction in one app
        </p>
        <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition">
          Get started
        </button>
      </div>

      <div className="text-white">
        {/* Genre Section */}
        <section className="bg-black py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Find your Match in More than 100 Genres and Categories
          </h2>

          <div className="flex justify-center gap-4 flex-wrap px-4">
            {/* Example Book Covers */}
            {[
              "/covers/ancestral-code.jpg",
              "/covers/lazarus.jpg",
              "/covers/lagos-london.jpg",
              "/covers/in-bed.jpg",
              "/covers/crocodile-vault.jpg",
            ].map((src, idx) => (
              <div key={idx} className="w-32 md:w-40">
                <Image
                  src={src}
                  alt="Book cover"
                  width={160}
                  height={240}
                  className="rounded-md shadow-lg object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tagline Section */}
        <section className="bg-black relative py-16 text-center">
          {/* Decorative red wave pattern background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/decorative-wave.png"
              alt="Red wave"
              className="w-full h-full object-cover opacity-70"
            />
          </div>

          <div className="relative z-10 px-4">
            <h3 className="text-xl md:text-2xl font-semibold leading-relaxed">
              Feel the Fire of Black storytelling <br />
              <span className="text-red-500">
                where every book is a portal and every word is power
              </span>
            </h3>
          </div>
        </section>
      </div>
    </div>
  );
}
