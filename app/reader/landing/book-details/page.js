"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import BuyButton from "@/components/reader/BuyButton";

export default function BookDetails() {
  return (
    <div className="space-y-10 px-6">
      {/* Book Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src="/images/readers/landing/children-books/image01.png"
          alt="Rise of the Jumbies"
          width={150}
          height={220}
          className="rounded"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">Rise of the Jumbies</h2>
          <p className="text-gray-700">Tracey Baptiste</p>
          <div className="text-red-600 text-lg">★★★★★ (1,800 Ratings)</div>

          <div className="flex gap-4 mt-4">
            <BuyButton
              bookId={"52445bc9-b65f-469f-afbd-cd4a649a2a22"}
              // contentType="audiobook"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buy now
            </BuyButton>
            {/* <Button className="bg-red-600 hover:bg-red-700">Buy now</Button> */}
            <Button variant="outline">Add to Wishlist</Button>
            <Button variant="secondary">Read Sample</Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Publisher’s Description</h3>
        <p className="text-gray-700 leading-relaxed ">
          Dive into a spellbinding Caribbean adventure in Rise of the Jumbies,
          the thrilling sequel to The Jumbies. Corinne La Mer thought she had
          defeated the evil jumbie that once threatened her island home. But
          darkness stirs again—and this time, it’s beneath the waves. When
          children start disappearing, suspicion falls on Corinne. To clear her
          name and save the missing kids, she must venture into the deep,
          mysterious sea and strike a dangerous bargain with powerful sea
          creatures. Blending Caribbean folklore with heart-racing action,
          Tracey Baptiste crafts a mesmerizing tale of courage, friendship, and
          identity. Perfect for middle grade readers who love myth, magic, and
          brave heroines.
        </p>
      </section>

      {/* Book Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center border-t border-b py-4">
        <div>
          <strong>GENRE</strong>
          <p>Fiction</p>
        </div>
        <div>
          <strong>PUBLICATION DATE</strong>
          <p>January 15, 2025</p>
        </div>
        <div>
          <strong>LANGUAGE</strong>
          <p>English</p>
        </div>
        <div>
          <strong>LENGTH</strong>
          <p>654 Pages</p>
        </div>
        <div>
          <strong>SIZE</strong>
          <p>409.4 kb</p>
        </div>
      </div>

      {/* Reviews */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="min-w-[300px]">
              <CardContent className="p-4 space-y-2">
                <p className="font-semibold">Building Character</p>
                <p className="text-sm text-gray-700">
                  It’s an old book but the principle still apply...
                </p>
                <div className="text-red-500">★★★★★</div>
                <p className="text-xs text-gray-500">April 21, DEE</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* More Books */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          More Books by Tracey Baptiste
        </h3>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              src="/rise-of-the-jumbies.jpg"
              alt="More Book"
              width={100}
              height={150}
              className="rounded"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
