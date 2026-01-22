'use client';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {ReactLenis, useLenis} from "lenis/react";
import Image from "next/image";
import style from "@/css/home.module.css";
import img1 from "@/assets/img1.jpg"
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.jpg";
import img4 from "@/assets/img4.jpg" ;
import img5 from "@/assets/img5.jpg";



export default function Home() {
  const lenis = useLenis(({scroll}) => {});
  const container =useRef(null);

 useGSAP(
   () => {
     gsap.registerPlugin(ScrollTrigger);
     const cards = document.querySelectorAll(".card");
     const images = document.querySelectorAll(".card img");
     const totalCards = cards.length;

     gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0 });
     gsap.set(images[0], { scale: 1 });

     for (let i = 1; i < totalCards; i++) {
       gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
       gsap.set(images[i], { scale: 1 });
     }

     const scrollTimeline = gsap.timeline({
       scrollTrigger: {
         trigger: ".sticky_cards",
         start: "top top",
         end: `+=${window.innerHeight * (totalCards - 1)}`,
         pin: true,
         scrub: 0.5,
       },
     });

     for (let i = 0; i < totalCards - 1; i++) {
       const currentCard = cards[i];
       const currentImage = images[i];
       const nextCard = cards[i + 1];
       const position = i;

       scrollTimeline.to(
         currentCard,
         {
           scale: 0.5,
           rotation: 10,
           duration: 1,
           ease: "none",
         },
         position,
       );

       scrollTimeline.to(
         currentImage,
         {
           scale: 1.2,
         },
         position,
       );

       scrollTimeline.to(
         nextCard,
         {
           y: "0%",
           duration: 1,
           ease: "none",
         },
         position,
       );
     } 

     
     return () => {
       scrollTimeline.kill();
       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
     };
   },
   { scope: container },
 );
  return (
    <ReactLenis root>
      <div className={style.container} ref={container}>
        <section className={style.intro}>
          <h1>
            Art is not what you see .It&apos;s what you *feel* in the blur, the
            chaos, the motion ~ every pulse captures in color and form.
          </h1>
        </section>
        <section className={`${style.sticky_cards} sticky_cards`}>
          <div className={style.cards_container}>
            <div className={`${style.card} card`}>
              <div className={style.tag}>
                <p>Raw Emotion</p>
              </div>
              <Image src={img1} alt="image" width={1200} height={800} />
            </div>
            <div className={`${style.card} card`}>
              <div className={style.tag}>
                <p>Raw Emotion</p>
              </div>
              <Image src={img2} alt="image" width={1200} height={800} />
            </div>
            <div className={`${style.card} card`}>
              <div className={style.tag}>
                <p>Raw Emotion</p>
              </div>
              <Image src={img3} alt="image" width={1200} height={800} />
            </div>
            <div className={`${style.card} card`}>
              <div className={style.tag}>
                <p>Raw Emotion</p>
              </div>
              <Image src={img4} alt="image" width={1200} height={800} />
            </div>
            <div className={`${style.card} card`}>
              <div className={style.tag}>
                <p>Raw Emotion</p>
              </div>
              <Image src={img5} alt="image" width={1200} height={800} />
            </div>
          </div>
        </section>
        <section className={style.outro}>
          <h1>
            This isn*apos;t just motion. It&apos;s meaning in movement. In every
            blured edge and amplified hue. we trace the shape of something
            deeper ~ truth in abstraction
          </h1>
        </section>
      </div>
    </ReactLenis>
  );
}
