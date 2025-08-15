"use client";
import { currentGameInfo } from "@/state/games";
import Image from "next/image";
import { useState, useRef, useId, useEffect } from "react";

export interface SlideData {
  title: string;
  description?: string;
  price?: number;
  src: string;
  bgImg: string;
  releaseYear?: string;
  developer?: string;
  platforms?: string[];
  currentPrice?: number;
  rating?: number;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title } = slide;
  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex shadow-2xl flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-100 ease-in-out w-[55vmin] h-[35vmin] z-10 "
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: current !== index ? "scale(0.85)" : "scale(1)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full  rounded-[2%] overflow-hidden transition-all duration-100 ease-out">
          <Image
            className="absolute inset-0 rounded-[2%] w-[450px] h-[250px] object-cover aspect-auto opacity-100 transition-opacity duration-600 ease-in-out"
            width={450}
            height={250}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current !== index && (
            <div className="absolute inset-0 bg-black/65 transition-all duration-500" />
          )}
          {current === index && (
            <div className="absolute inset-0 bg-black/10 transition-all duration-500" />
          )}
        </div>

        <article
          className={`absolute p-[1vmin] transition-opacity w-full text-end duration-500 ease-in-out right-0 bottom-0 ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* <h2 className="text-[17px] font-semibold  relative font-clash-display">
            {title}
          </h2> */}
        </article>
      </li>
    </div>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function CarouselGames({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const { setCurrentGame } = currentGameInfo();

  const handlePreviousClick = () => {
    const previous = current - 1;
    const previousIndex = previous < 0 ? slides.length - 1 : previous;
    setCurrent(previousIndex);
    setCurrentGame({
      src: slides[previousIndex]?.bgImg as string,
      title: slides[previousIndex]?.title as string,
      description: slides[previousIndex]?.description as string,
      price: slides[previousIndex]?.price as number,
      releaseYear: slides[previousIndex]?.releaseYear as string,
      developer: slides[previousIndex]?.developer as string,
      platforms: slides[previousIndex]?.platforms as string[],
      currentPrice: slides[previousIndex]?.currentPrice as number,
      rating: slides[previousIndex]?.rating as number,
    });
  };

  const handleNextClick = () => {
    const next = current + 1;
    const nextIndex = next === slides.length ? 0 : next;
    setCurrent(nextIndex);
    setCurrentGame({
      src: slides[nextIndex]?.bgImg as string,
      title: slides[nextIndex]?.title as string,
      description: slides[nextIndex]?.description as string,
      price: slides[nextIndex]?.price as number,
      releaseYear: slides[nextIndex]?.releaseYear as string,
      developer: slides[nextIndex]?.developer as string,
      platforms: slides[nextIndex]?.platforms as string[],
      currentPrice: slides[nextIndex]?.currentPrice as number,
      rating: slides[nextIndex]?.rating as number,
    });
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
      setCurrentGame({
        src: slides[index]?.bgImg as string,
        title: slides[index]?.title as string,
        description: slides[index]?.description as string,
        price: slides[index]?.price as number,
        releaseYear: slides[index]?.releaseYear as string,
        developer: slides[index]?.developer as string,
        platforms: slides[index]?.platforms as string[],
        currentPrice: slides[index]?.currentPrice as number,
        rating: slides[index]?.rating as number,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousClick();
      } else if (event.key === "ArrowRight") {
        handleNextClick();
      }
    };

    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [current]);

  const id = useId();

  return (
    <div className="relative w-full" aria-labelledby={`carousel-heading-${id}`}>
      <ul
        className="absolute flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    </div>
  );
}
