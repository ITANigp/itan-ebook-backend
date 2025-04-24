import React from 'react'

const AuthorDashboard = () => {
  return (
    <section className="container">
      <div className="lg:ml-64 lg:mt-20 px-4 lg:px-0 py-6">
        <h2 className="font-bold text-2xl mb-6 text-center sm:text-left">
          Welcome! What would you like to create?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-screen-lg mx-auto">
          {[
            { title: "E-Books", img: "/images/ebook.png" },
            { title: "Audiobooks", img: "/images/audiobook.png" },
            { title: "Book Series", img: "/images/book-series.png" },
            { title: "Audiobook Series", img: "/images/book-series.png" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-16 h-16 mb-3" />
              <h5 className="text-lg font-medium text-gray-900 text-center">
                {item.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AuthorDashboard