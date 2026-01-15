import { Card, CardContent } from '@/components/ui/card';
import {
  MessageSquare,
  Users,
  Shield,
  Zap,
  Mic,
  Settings,
  Bot,
  Lock,
  Smartphone
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Rich Text Chat',
    description: 'Send messages, share files, and express yourself with emojis and reactions.',
    gradient: 'gradient-primary'
  },
  {
    icon: Mic,
    title: 'Crystal Clear Voice',
    description: 'High-quality voice channels with noise suppression and echo cancellation.',
    gradient: 'gradient-secondary'
  },
  {
    icon: Users,
    title: 'Unlimited Servers',
    description: 'Create or join unlimited servers and organize your communities perfectly.',
    gradient: 'gradient-primary'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance for instant messaging and seamless experience.',
    gradient: 'gradient-primary'
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Themes, plugins, and extensive customization options for your style.',
    gradient: 'gradient-secondary'
  },
  {
    icon: Lock,
    title: 'Private Channels',
    description: 'Create private channels and control access with advanced permissions.',
    gradient: 'gradient-primary'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gaming-dark/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for
            <br />
            <span className="text-gradient">Modern Communities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, manage, and grow your gaming community.
            From AI moderation to crystal-clear voice chat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-glow group"
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:animate-pulse-glow transition-smooth`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default FeaturesSection;