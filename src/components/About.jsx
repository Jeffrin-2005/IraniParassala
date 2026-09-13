import Reveal from "./Reveal";
import Sunburst from "./Sunburst";
import mural from "../assets/images/mural-1.webp";

export default function About() {
  return (
    <section id="about" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <Sunburst
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-[0.07]"
        stroke="#B9924F"
      />
      <div className="container-narrow grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={mural}
              alt="Hand-painted mural on the wall inside Irani Restaurant"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden sm:flex h-28 w-28 items-center justify-center rounded-full bg-burgundy text-cream shadow-soft">
            <Sunburst className="h-16 w-16" stroke="#F5EEE1" rays={16} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">A Taste of Tradition</p>
          <h2 className="section-heading">
            Food, made to bring
            <br />
            people together.
          </h2>
          <p className="mt-6 max-w-lg text-charcoal/75 leading-relaxed">
            At Irani Restaurant, food is about more than a meal. It's about
            bringing people together around comforting flavours, generous
            hospitality and the simple pleasure of enjoying good food — the
            kind of place in Parassala where you come back not just for the
            biriyani, but for how at home it makes you feel.
          </p>
          <p className="mt-4 max-w-lg text-charcoal/75 leading-relaxed">
            From hearty rice specialities to quick snacks and warm drinks,
            every dish is prepared with care and served with the kind of
            hospitality that keeps our regulars coming back.
          </p>

          <div className="mt-9 flex items-center gap-6">
            <div className="h-px flex-1 max-w-[64px] bg-gold/50" />
            <span className="font-display italic text-lg text-burgundy">
              Warm hospitality, always
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
