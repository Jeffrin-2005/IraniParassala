// ---------------------------------------------------------------------------
// GALLERY DATA — swap the `src` for your own photography whenever you like.
// `import.meta.glob`/static imports are used in Gallery.jsx, so just make
// sure every image referenced here lives in src/assets/images.
// ---------------------------------------------------------------------------
import biryaniDuo from "../assets/images/biryani-duo.jpeg";
import chickenBiryani from "../assets/images/chicken-biryani.jpg";
import friedRice from "../assets/images/fried-rice.jpg";
import noodles from "../assets/images/chinese-noodles.jpg";
import mural1 from "../assets/images/mural-1.webp";
import mural2 from "../assets/images/mural-2.webp";

export const galleryImages = [
  { src: biryaniDuo, alt: "Two platters of spiced chicken biriyani with raita and chutneys", tag: "Biriyani", tall: true },
  { src: mural1, alt: "Hand-painted Aperol Spritz mural inside the restaurant", tag: "Ambience" },
  { src: chickenBiryani, alt: "Chicken biriyani platter with raita, chutneys and salad", tag: "Biriyani" },
  { src: noodles, alt: "Bowl of chilli garlic noodles garnished with spring onion", tag: "Snacks", tall: true },
  { src: mural2, alt: "Close-up of the restaurant's art-deco wall mural", tag: "Ambience" },
  { src: friedRice, alt: "Bowl of fried rice with egg and shredded chicken", tag: "Main Course" },
];
