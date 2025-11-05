import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-dvh">
      <div className="bg-primary flex h-9/10 items-center justify-center">
        <Image
          src="/images/library-card.jpg"
          width={1080}
          height={1080}
          className="size-50 md:size-100"
          priority={true}
          alt={"Snakes Illustration by Lot van Teylingen"}
        />
      </div>
      <div className="flex h-1/10 items-center bg-white">
        <h1 className="container text-end text-2xl text-black md:text-5xl">
          This is Library Card
        </h1>
      </div>
    </section>
  );
}