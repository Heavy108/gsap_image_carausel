'use client'
import { useRef ,useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import style from "@/css/pin.module.css"
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);
export default function Pin(){

  const lenisRef = useRef();
  const containerRef =useRef(null);
  
  useEffect(() =>{
    function update(time){
      lenisRef.current?.lenis?.raf(time*1000);
    }
    lenisRef.current?.lenis?.on("scroll", ScrollTrigger);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(() => {

    const sections = document.querySelectorAll(".section");
    sections.forEach((section,index) =>{
      const container = section.querySelector(".container");

      gsap.to(container,{
        rotation:0,
        ease:"none",
        scrollTrigger:{
          trigger:section,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        }
      });

      if (index ===sections.length -1) return;

      ScrollTrigger.create({
        trigger:section,
        start:"bottom bottom",
        end:"bottom top",
        pin:true,
        pinSpacing:false,

      })
    })
  }, {scope: containerRef});
    return (
      <>
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
        <main className={style.main} ref={containerRef}>
          <section className={`${style.one} one section ${style.section}`}>
            <div className={`${style.container} container`}>
              <div className={style.col}>
                <h1>Entry Point</h1>
              </div>
              <div className={style.col}>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </section>
          <section className={`${style.two} two section ${style.section}`}>
            <div className={`${style.container} container`}>
              <div className={style.col}>
                <div className={style.img}>
                  <Image
                    src="/img1.jpg"
                    alt="image"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>
              <div className={style.col}>
                <h1>Gesture</h1>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </section>

          <section className={`${style.three} three section ${style.section}`}>
            <div className={`${style.container} container`}>
              <div className={style.col}>
                <h1>Gesture Three</h1>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                </p>
              </div>
              <div className={style.col}>
                <div className={style.img}>
                  <Image
                    src="/img2.jpg"
                    alt="image"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={`${style.four} four section ${style.section}`}>
            <div className={`${style.container} container`}>
              <div className={style.img}>
                <Image src="/img3.jpg" alt="image2" width={1200} height={800} />
              </div>
              <h1>The Stance Four</h1>
              <p>
                orem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                orem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic
              </p>
            </div>
          </section>

          <section className={`${style.five} five section ${style.section}`}>
            {" "}
            <div className={`${style.container} container`}>
              <div className={style.col}>
                <h1>fifth section</h1>
              </div>
              <div className={style.col}>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </section>

          <section className={`${style.six} six section ${style.section}`}>
            <div className={`${style.container} container`}>
              <div className={style.col}>
                <h1>Release sisth</h1>
              </div>
              <div className={style.col}>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </section>

          <footer>
            <h1>Footer</h1>
          </footer>
        </main>
      </>
    );
}