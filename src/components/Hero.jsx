import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="bg-neutral-50">

      <div className="container-narrow">

        <div className="grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">

          {/* Text */}
          <div>

            <p className="eyebrow mb-6">
              Irani Restaurant · Parassala
            </p>

            <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-neutral-950 sm:text-7xl lg:text-8xl">
              Good food.
              <br />
              Simple moments.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-neutral-600">
              Authentic flavours, generous portions and warm hospitality.
              A place to enjoy good food with the people who matter.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <a
                href="#menu"
                className="minimal-button"
              >
                Explore Menu
                <ArrowRight size={16} className="ml-2" />
              </a>

              <a
                href="#reservation"
                className="minimal-button-light"
              >
                Reserve a Table
              </a>

            </div>

          </div>

          {/* Image */}
          <div className="restaurant-image h-[500px] lg:h-[650px]">

            <img
              src="/src/assets/hero.png"
              alt="Irani Restaurant"
            />

          </div>

        </div>

        <div className="pb-10 text-neutral-400">
          <ArrowDown size={18} />
        </div>

      </div>

    </section>
  );
}