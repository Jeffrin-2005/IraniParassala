import InstagramIcon from "./InstagramGlyph";
import Reveal from "./Reveal";
import { site } from "../lib/site";
import biryaniDuo from "../assets/images/biryani-duo.jpeg";
import chickenBiryani from "../assets/images/chicken-biryani.jpg";
import friedRice from "../assets/images/fried-rice.jpg";
import noodles from "../assets/images/chinese-noodles.jpg";
import mural1 from "../assets/images/mural-1.webp";
import mural2 from "../assets/images/mural-2.webp";

// NOTE: This grid uses real restaurant photos as placeholders — it is not a
// live Instagram feed. Wire it up to the Instagram Basic Display / Graph API
// (or an embed service) to pull real posts automatically.
const posts = [biryaniDuo, mural1, chickenBiryani, noodles, mural2, friedRice];

export default function Instagram() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Follow Our Journey</p>
          <h2 className="section-heading">@irani_parassala</h2>
          <p className="mt-5 text-charcoal/65">
            Good food is always better when shared. Follow Irani Restaurant on
            Instagram for food, moments and updates.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt="Photo from Irani Restaurant's Instagram"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
                  <InstagramIcon
                    size={26}
                    className="text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold tracking-wide text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <InstagramIcon size={16} />
            Follow on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
