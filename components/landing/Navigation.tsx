"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare } from "lucide-react";
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const handleSignIn = () =>{
    console.log('clicked')
    router.push('/sign-in')
  }

  const handleSignUp = () =>{
    console.log('cliked')
    router.push('/sign-up')
  }

  return (

    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#313338] backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              EchoSpace
            </span>
          </div>



          {/* Desktop Buttons */}
          <div className="invisible md:visible flex items-center space-x-4">
            <Button
              onClick={handleSignIn}
              variant="outline"
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            >
              Sign In
            </Button>
            <Button
              onClick={handleSignUp}
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {/* Mobile Menu Button - Only shown on small screens */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>



        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-black/95">
            <div className="flex flex-col space-y-4">

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-300 dark:border-gray-700">
                <Button
                  onClick={handleSignIn}
                  variant="outline"
                  className="justify-start text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleSignUp}
                  className="bg-blue-600 justify-start text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
