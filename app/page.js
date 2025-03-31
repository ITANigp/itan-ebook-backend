import Link from "next/link"

export default function Demo() {
  return (
    <>
      <section>
        <div>
          <h1>Discover Global Publishing with ITAN</h1>
          <p>
            Publish your manuscripts in multiple formats. Create ebooks and
            audiobooks to expand your reach and connect with new readers.
          </p>
          <div>
            <Link
              href="/author/sign_in"
              className="text-[#EF5353] border border-[#EF5353] cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/author/sign_up"
              className="bg-[#EF5353] text-white cursor-pointer"
            >
              Join Itan
            </Link>
          </div>
        </div>
        <img
          src="/images/books-with-headphone.png"
          alt="books-with-headphone"
        />
      </section>

      <section>
        <h2>
          ITAN makes self-publishing simple, allowing you to release books in
          different formats and engage new readers worldwide.
        </h2>
      </section>
      <section>
        <img src="/images/books.png" alt="books" />
        <div>
          <h2>
            Let the World <span>Read and</span> Listen to your Unique Story
          </h2>
        </div>
      </section>

      <section>
        <div>
          <h2>Increase your Earnings with ITAN – Monetize your Works</h2>
          <h3>Control your earnings</h3>

          <div>
            <img
              src="/images/increase-your-earnings.png"
              alt="increase your earnings"
            />
            <div>
              <p>Earn up to 70% on eBooks</p>
              <p>Earn up to 70% royalty on all ebooks sold through ITAN</p>
            </div>
          </div>
          <div>
            <img src="/images/earn-up.png" alt="earn up" />
            <div>
              <p>Earn up to 65% on audio books</p>
              <p>
                Earn up to 60% royalty on audiobooks and hardcover books sold
                through ITAN
              </p>
            </div>
          </div>
          <div>
            <img src="/images/earn-up.png" alt="earn up" />
            <div>
              <p>Payment of earnings into your local account</p>
              <p>
                Control your earnings and get paid into any bank account of your
                choosing
              </p>
            </div>
          </div>
        </div>
        <img src="/images/local-account.png" alt="local account" />
      </section>

      <section>
        <h2>Publish a variety of Genres</h2>
        <div>
          <div>
            <img src="/images/lit-and-fiction.png" alt="literature & fiction" />
            <p>Literature & Fiction </p>
          </div>

          <div>
            <img src="/images/horror.png" alt="horror" />
            <p>Horror</p>
          </div>

          <div>
            <img src="/images/teen-and-young.png" alt="Teen & Young Adult" />
            <p>Teen & Young Adult</p>
          </div>

          <div>
            <img src="/images/romance.png" alt="Romance" />
            <p>Romance</p>
          </div>

          <div>
            <img src="/images/mystery.png" alt="mystery" />
            <p>Mystery</p>
          </div>

          <div>
            <img src="/images/comics.png" alt="comics" />
            <p>Comics</p>
          </div>
        </div>
      </section>

      <section>
        <img src="/images/manage-your-earning.png" alt="Manage your earnings" />
        <div>
          <h2>Publish, Monitor Sales, and Manage Your Earnings</h2>
          <p>
            Own your publishing process with ITAN—customize your book’s content,
            look, and price.
          </p>
          <ul>
            <li>Publish as many titles as you desire.</li>
            <li>
              Maintain full control and ownership of your content, publish at
              your convenience and set your pricing.
            </li>
          </ul>
          <button>Get Started</button>
        </div>
      </section>
    </>
  );
            

}