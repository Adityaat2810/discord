"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, MessageSquare, Shield, Bot, Video, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter()


  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignUp = () =>{
    console.log('cliked')
    router.push('/sign-up')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div
        className="absolute w-96 h-96 rounded-full blur-3xl transition-transform duration-1000 ease-out bg-black/5 dark:bg-white/5"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          left: "50%",
          top: "50%",
          marginLeft: "-12rem",
          marginTop: "-12rem",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 mb-8 backdrop-blur-sm">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              🚀 AI-powered moderation
            </span>
          </div>

          {/* Typography */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            <span className="text-black dark:text-white">Echo Space</span>
            <br />
            <span className="text-gray-600 dark:text-gray-400 text-4xl md:text-5xl font-normal">
              Community Awaits
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with friends, join servers, and chat with confidence.
            Simple, fast, and secure communication for everyone.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="group bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-lg px-8 py-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={handleSignUp}
            >
              <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-lg border-black/30 dark:border-white/30 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>


          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            {[
              { icon: Users, text: "Communities" },
              { icon: MessageSquare, text: "Real-time Chat" },
              { icon: Shield, text: "AI Moderation" },
              { icon: Bot, text: "Bot Help" },
              { icon: Video, text: "Video Calls" },
              { icon: LayoutGrid, text: "Sub-Chats" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <feature.icon className="w-8 h-8 text-black dark:text-white" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
