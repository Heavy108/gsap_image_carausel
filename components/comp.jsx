"use client";

import { useRef } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import { setupMarqueeAnimation } from "@/lib/marquee";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollAnimation() {
  const containerRef = useRef(null);
  const lenis = useLenis(({ scroll }) => {
    // Lenis scroll callback - can be used for debugging or custom scroll logic
  });

  // GSAP animations with useGSAP hook
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      const introCard = cards[0];

      if (!introCard) return;

      const cardImgWrapper = introCard.querySelector(".card-img");
      const cardImg = introCard.querySelector(".card-img img");

      if (cardImgWrapper && cardImg) {
        gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
        gsap.set(cardImg, { scale: 1.5 });
      }

      function animateContentIn(titleChars, description) {
        gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
        gsap.to(description, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.1,
          ease: "power4.out",
        });
      }

      function animateContentOut(titleChars, description) {
        gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
        gsap.to(description, {
          x: "40px",
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      }

      const marquee = introCard.querySelector(".card-marquee .marquee");
      const titleChars = introCard.querySelector(".char span");
      const description = introCard.querySelector(".card-description");

      if (marquee && titleChars && description) {
        ScrollTrigger.create({
          trigger: introCard,
          start: "top top",
          end: "+=300vh",
          onUpdate: (self) => {
            const progress = self.progress;
            const imgScale = 0.5 + progress * 0.5;
            const borderRadius = 400 - progress * 375;
            const innerImgScale = 1.5 - progress * 0.5;

            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
            gsap.set(cardImg, { scale: innerImgScale });

            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(marquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(marquee, { opacity: 0 });
            }

            if (progress >= 1 && !introCard.contentRevealed) {
              introCard.contentRevealed = true;
              animateContentIn(titleChars, description);
            }
          },
        });
      }

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: isLastCard ? "+=100vh" : "top top",
          endTrigger: isLastCard ? null : cards[cards.length - 1],
          pin: true,
          pinSpacing: isLastCard,
        });
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const cardWrapper = card.querySelector(".card-wrapper");
          if (cardWrapper) {
            ScrollTrigger.create({
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardWrapper, {
                  scale: 1 - progress * 0.25,
                  opacity: 1 - progress,
                });
              },
            });
          }
        }
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          const cardImg = card.querySelector(".card-img img");
          const imgContainer = card.querySelector(".card-img");
          if (cardImg && imgContainer) {
            ScrollTrigger.create({
              trigger: card,
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardImg, { scale: 2 - progress });
                gsap.set(imgContainer, {
                  borderRadius: 150 - progress * 125 + "px",
                });
              },
            });
          }
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const cardDescription = card.querySelector(".card-description");
        const cardTitleChars = card.querySelectorAll(".char span");

        if (cardDescription && cardTitleChars.length > 0) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            onEnter: () => animateContentIn(cardTitleChars, cardDescription),
            onLeaveBack: () =>
              animateContentOut(cardTitleChars, cardDescription),
          });
        }
      });

      setupMarqueeAnimation();

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <ReactLenis root>
      <div ref={containerRef}>
        <section className="intro">
          <h1>We design spaces that dont just exist.</h1>
        </section>

        <section className="cards">
          {/* Card 1 */}
          <div className="card">
            <div className="card-marquee">
              <div className="marquee">
                <h1>Design Beyond Boundaries</h1>
                <h1>Built for Tomorrow</h1>
                <h1>Real Impact</h1>
                <h1>Digital Visions</h1>
              </div>
            </div>
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>
                    <span className="char">
                      <span>C</span>
                    </span>
                    <span className="char">
                      <span>u</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>v</span>
                    </span>
                    <span className="char">
                      <span>e</span>
                    </span>
                    <span className="char">
                      <span>d</span>
                    </span>{" "}
                    <span className="char">
                      <span>H</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>i</span>
                    </span>
                    <span className="char">
                      <span>z</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>n</span>
                    </span>
                  </h1>
                </div>
                <div className="card-description">
                  <p>
                    Experience the future of architecture with our innovative
                    designs.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <img src="/img1.jpg" alt="first image" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>
                    <span className="char">
                      <span>C</span>
                    </span>
                    <span className="char">
                      <span>u</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>v</span>
                    </span>
                    <span className="char">
                      <span>e</span>
                    </span>
                    <span className="char">
                      <span>d</span>
                    </span>{" "}
                    <span className="char">
                      <span>H</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>i</span>
                    </span>
                    <span className="char">
                      <span>z</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>n</span>
                    </span>
                  </h1>
                </div>
                <div className="card-description">
                  <p>
                    Experience the future of architecture with our innovative
                    designs.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <img src="/img2.jpg" alt="second image" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>
                    <span className="char">
                      <span>C</span>
                    </span>
                    <span className="char">
                      <span>u</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>v</span>
                    </span>
                    <span className="char">
                      <span>e</span>
                    </span>
                    <span className="char">
                      <span>d</span>
                    </span>{" "}
                    <span className="char">
                      <span>H</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>i</span>
                    </span>
                    <span className="char">
                      <span>z</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>n</span>
                    </span>
                  </h1>
                </div>
                <div className="card-description">
                  <p>
                    Experience the future of architecture with our innovative
                    designs.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <img src="/img3.jpg" alt="third image" />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <div className="card-wrapper">
              <div className="card-content">
                <div className="card-title">
                  <h1>
                    <span className="char">
                      <span>C</span>
                    </span>
                    <span className="char">
                      <span>u</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>v</span>
                    </span>
                    <span className="char">
                      <span>e</span>
                    </span>
                    <span className="char">
                      <span>d</span>
                    </span>{" "}
                    <span className="char">
                      <span>H</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>r</span>
                    </span>
                    <span className="char">
                      <span>i</span>
                    </span>
                    <span className="char">
                      <span>z</span>
                    </span>
                    <span className="char">
                      <span>o</span>
                    </span>
                    <span className="char">
                      <span>n</span>
                    </span>
                  </h1>
                </div>
                <div className="card-description">
                  <p>
                    Experience the future of architecture with our innovative
                    designs.
                  </p>
                </div>
              </div>
              <div className="card-img">
                <img src="/img4.jpg" alt="fourth image" />
              </div>
            </div>
          </div>
        </section>

        <section className="outro">
          <h1>Thank you for visiting our gallery</h1>
        </section>
      </div>
    </ReactLenis>
  );
}
