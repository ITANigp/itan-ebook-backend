import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="relative h-[600px] bg-black text-white overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/reader-hero.png" // Use the image URL you want for the background
            alt="Books background"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>

        {/* Top branding and CTA */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Logo top-left */}
          <div className="absolute top-6 left-6 text-4xl font-bold text-red-600">
            ITAN
          </div>

          {/* Sign Up button top-right */}
          <div className="absolute top-6 right-6">
            <button className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition shadow">
              Sign Up
            </button>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Home of Black Fiction Novels
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Explore the richest collection of black fiction in one app
          </p>

          {/* CTA Button */}
          <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition">
            Get started
          </button>
        </div>

        {/* Red Wave Pattern at Bottom */}
        <div className="absolute bottom-0 w-full z-10">
          <Image
            src="/images/decorative-wave.png" // The red wave image URL
            alt="Red wave"
            width={1440} // Adjust width if needed
            height={150} // Adjust height based on design
            className="object-cover"
          />
        </div>
      </section>

      <section className="py-14 bg-[#050A30]">
        <h3 className="text-4xl text-center text-white mb-14">
          Find your Match in More than 100 <br /> Genres and Categories
        </h3>
        <div className="flex justify-center space-x-2">
          <Image
            src="/images/readers/onboarding/ancestral-code.png"
            width={150}
            height={400}
            alt="ancestral code"
          />
          <Image
            src="/images/readers/onboarding/Lazarus.png"
            width={150}
            height={400}
            alt="Lazarus Convergence"
          />
          <Image
            src="/images/readers/onboarding/titan-race.png"
            width={150}
            height={400}
            alt="Titan race"
          />
          <Image
            src="/images/readers/onboarding/in-bed-with-her-guy.png"
            width={150}
            height={400}
            alt="in bed with her guy"
          />
          <Image
            src="/images/readers/onboarding/sons-of-the-7th-dawn.png"
            width={150}
            height={400}
            alt="sons of the 7th dawn"
          />
        </div>
      </section>
    </div>
  );
}
