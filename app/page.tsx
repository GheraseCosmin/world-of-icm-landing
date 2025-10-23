"use client";

import { Badge } from "@/components/ui/pixelact-ui/badge";
import { Button } from "@/components/ui/pixelact-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/pixelact-ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1 second delay
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pixel-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/GIF */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/hero.gif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-purple-900/60"></div>

        {/* Animated Background Elements */}
        {/* <div className="absolute inset-0 retro-grid opacity-20"></div> */}
        {/* <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 pixel-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 pixel-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-600 pixel-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-purple-300 pixel-rotate"></div> */}

        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1
              className="text-4xl md:text-8xl font-bold mb-6 pixel-font glitch"
              data-text="WORLD OF ICM"
            >
              WORLD OF ICM
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-500 pixel-font">
              Multiplayer 2D Pixel Art on Dev.Fun
            </p>
            <p className=" text-sm lg:text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
              Explore, mine, trade, and earn real rewards in the ultimate
              blockchain gaming experience. Connect your wallet and start your
              adventure today!
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              variant="default"
              size="lg"
              className="pixel-glow text-lg px-8 py-4 pixel-font"
            >
              🎮 PLAY NOW
            </Button>
            {/* <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4 pixel-font"
            >
              🔗 CONNECT WALLET
            </Button> */}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixel-font pixel-slide-in">
              Upgrade and Earn
            </h2>
            <p className="text-xl text-purple-300 pixel-font">
              Meet the heroes of World of ICM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, index) => (
              <Card
                key={index}
                className="pixel-fade-in hover:pixel-glow transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={`/characters/lvl${index + 1}.png`}
                      alt={`Character Level ${index + 1}`}
                      className="w-24 h-24 mx-auto pixel-bounce group-hover:pixel-shake"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <Badge
                      variant="default"
                      className="absolute -top-2 -right-2 pixel-font text-xs pixel-pulse"
                    >
                      RANK {index + 1}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg pixel-font">
                    LEVEL {index + 1} HERO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {index === 0 && "Beginner adventurer with basic equipment"}
                    {index === 1 && "Novice warrior with improved gear"}
                    {index === 2 && "Experienced fighter with magical weapons"}
                    {index === 3 && "Veteran knight with enchanted armor"}
                    {index === 4 && "Elite warrior with legendary equipment"}
                    {index === 5 && "Master fighter with divine weapons"}
                    {index === 6 && "Champion knight with celestial armor"}
                    {index === 7 && "Legendary hero with godly equipment"}
                    {index === 8 && "Ultimate hero with ultimate equipment"}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixel-font pixel-slide-in">
              GAMEPLAY FEATURES
            </h2>
            <p className="text-xl text-purple-300 pixel-font">
              Experience the future of gaming
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "MINE & CRAFT",
                description: "Dig for rare resources and craft powerful NFTs",
                icon: "⛏️",
                delay: "0s",
              },
              {
                title: "TRADE & EARN",
                description: "Trade with other players",
                icon: "💰",
                delay: "0.2s",
              },
              {
                title: "EXPLORE DUNGEONS",
                description: "Fight monsters and discover epic loot",
                icon: "🗡️",
                delay: "0.4s",
              },
              {
                title: "LEVEL UP",
                description: "Earn real rewards as you progress",
                icon: "⭐",
                delay: "0.6s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="pixel-fade-in pixel-shake hover:pixel-glow transition-all duration-300"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4 pixel-bounce">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg pixel-font">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixel-font pixel-slide-in">
              ROADMAP
            </h2>
            <p className="text-xl text-purple-300 pixel-font">
              Our journey to the future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                phase: "PHASE 1",
                title: "Core Gameplay",
                description:
                  "Movement, combat, mining, crafting, multiplayer and basic systems",
                status: "completed",
                color: "bg-green-500",
              },
              {
                phase: "PHASE 2",
                title: "Blockchain Integration",
                description: "Wallet connection and solana integration",
                status: "in-progress",
                color: "bg-purple-500",
              },
              {
                phase: "PHASE 3",
                title: "Launch on Dev.Fun",
                description: "Launch on Dev.Fun and start playing",
                status: "upcoming",
                color: "bg-blue-500",
              },
              {
                phase: "PHASE 4",
                title: "Expansion",
                description: "New maps, dungeons, and more content",
                status: "upcoming",
                color: "bg-orange-500",
              },
            ].map((phase, index) => (
              <Card
                key={index}
                className="pixel-fade-in hover:pixel-glow transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 ${phase.color} pixel-pulse`}></div>
                    <Badge variant="secondary" className="pixel-font text-xs">
                      {phase.phase}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg pixel-font">
                    {phase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {phase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social & FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixel-font pixel-slide-in">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-xl text-purple-300 pixel-font">
              Connect with fellow adventurers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Links */}
            <Card className="pixel-fade-in">
              <CardHeader>
                <CardTitle className="text-xl pixel-font">
                  SOCIAL LINKS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="default"
                  onClick={() =>
                    window.open("https://x.com/WorldOfICM", "_blank")
                  }
                  className="w-full justify-start pixel-font"
                >
                  🐦 Twitter / X
                </Button>
                {/* <Button
                  variant="secondary"
                  className="w-full justify-start pixel-font"
                >
                  💬 Discord
                </Button> */}
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open("https://dev.fun/WorldOfICM", "_blank")
                  }
                  className="w-full justify-start pixel-font"
                >
                  dev.fun
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="pixel-fade-in">
              <CardHeader>
                <CardTitle className="text-xl pixel-font">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm pixel-font mb-2">
                    How to play?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Connect your Solana wallet and start exploring!
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm pixel-font mb-2">
                    Is it free-to-play?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Yes! Play for free and earn rewards.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm pixel-font mb-2">
                    How to connect wallet?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Use Phantom or Solflare wallet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 pixel-font">
            © 2025 World of ICM. Built on Solana. Made with ❤️ for gamers.
          </p>
        </div>
      </footer>
    </div>
  );
}
