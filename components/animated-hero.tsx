"use client";

import { Button } from "@/components/ui/pixelact-ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// Generate image sequence URLs (scene00001.png to scene00153.png)
const generateImageUrl = (frameNumber: number): string => {
  const paddedNumber = frameNumber.toString().padStart(5, "0");
  return `/hero-scene/scene${paddedNumber}.png`;
};

const imageUrls = Array.from({ length: 153 }, (_, i) =>
  generateImageUrl(i + 1)
);

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef({ frame: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);

  // Text animation refs
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  // Preload images for smooth animation
  const preloadImages = useCallback(() => {
    const imagePromises = imageUrls.map(
      (url) =>
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn("Failed to load image:", url);
            resolve(null);
          };
          img.src = url;
        })
    );
    return Promise.all(imagePromises);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const loadImages = async () => {
      console.log("Loading images...");
      const images = await preloadImages();
      const validImages = images.filter(Boolean) as HTMLImageElement[];
      imagesRef.current = validImages;
      setTotalFrames(validImages.length);
      console.log(`Loaded ${validImages.length} images`);
      setIsImagesLoaded(true);
    };

    const drawFrame = (frameNumber: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[frameNumber];
      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };

    const handleResize = () => {
      if (isImagesLoaded) {
        drawFrame(Math.round(frameRef.current.frame));
      }
    };

    const initAnimation = () => {
      if (!isImagesLoaded || imagesRef.current.length === 0) {
        console.log("Animation not initialized:", {
          isImagesLoaded,
          imageCount: imagesRef.current.length,
        });
        return;
      }

      console.log(
        "Initializing animation with",
        imagesRef.current.length,
        "frames"
      );

      // Set initial text opacity to 0 and scale for pop-up effect
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          buttonsRef.current,
        ],
        {
          opacity: 0,
          scale: 0.8,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            document.body.classList.add("hero-visible");
          },
          onLeave: () => {
            document.body.classList.remove("hero-visible");
          },
          onEnterBack: () => {
            document.body.classList.add("hero-visible");
          },
          onLeaveBack: () => {
            document.body.classList.remove("hero-visible");
          },
        },
      });

      // Image sequence animation
      tl.to(frameRef.current, {
        frame: Math.max(0, imagesRef.current.length - 1),
        ease: "none",
        onUpdate: () => {
          const i = Math.round(frameRef.current.frame);
          setCurrentFrame(i);
          if (i >= 0 && i < imagesRef.current.length) {
            drawFrame(i);
          }
        },
      });

      // Text pop-up animation (starts after 20% of scroll)
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.2
      )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0.4
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0.6
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0.8
        );
    };

    const setupInitialCanvas = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw initial background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw loading text
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Loading images...", rect.width / 2, rect.height / 2);
    };

    setupInitialCanvas();
    loadImages().then(() => {
      if (imagesRef.current.length > 0) {
        drawFrame(0);
        initAnimation();
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isImagesLoaded, preloadImages]);

  return (
    <div ref={containerRef} className="h-[300vh] relative ">
      {/* Canvas for image sequence animation */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 w-full h-screen bg-black"
      />

      {/* Text Content - positioned on screen */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div>
            <h1
              ref={titleRef}
              className="text-4xl md:text-8xl font-bold mb-6 pixel-font glitch"
              data-text="WORLD OF ICM"
            >
              WORLD OF ICM
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl mb-8 text-yellow-500 pixel-font bg-black/50 p-4  mx-auto"
            >
              Multiplayer 2D Pixel Art on Dev.Fun
            </p>
            <p
              ref={descriptionRef}
              className="text-sm lg:text-lg mb-12 text-yellow-500 bg-black/50 p-4 rounded-lg max-w-2xl mx-auto"
            >
              Explore, mine, trade, and earn real rewards in the ultimate
              blockchain gaming experience. Connect your wallet and start your
              adventure today!
            </p>
          </div>

          <div ref={buttonsRef}>
            <Button
              variant="default"
              size="lg"
              className="pixel-glow text-lg px-8 py-4 pixel-font pointer-events-auto"
            >
              🎮 PLAY NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      {/* {isImagesLoaded && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm z-10">
          Frame {currentFrame + 1} / {totalFrames}
        </div>
      )} */}

      {/* Debug info */}
      {/* <div className="absolute top-4 left-4 text-white text-sm z-10">
        Images loaded: {isImagesLoaded ? "Yes" : "No"} | Frames: {totalFrames}
      </div> */}

      {/* Scroll instruction */}
      {/* {isImagesLoaded && (
        <div className="absolute bottom-8 right-8 text-white text-sm animate-bounce z-10">
          Scroll to animate
        </div>
      )} */}
    </div>
  );
}
