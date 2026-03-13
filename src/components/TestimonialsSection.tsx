import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@sarahchen',
    body: 'SEOPulse AI boosted our organic traffic by 340% in just 3 months. The AI recommendations are incredibly accurate!',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    role: 'Marketing Director',
  },
  {
    name: 'James Rodriguez',
    username: '@jamesrod',
    body: 'The content optimization suggestions are spot-on. Our blog posts now consistently rank on page one.',
    img: 'https://randomuser.me/api/portraits/men/51.jpg',
    role: 'Content Strategist',
  },
  {
    name: 'Priya Sharma',
    username: '@priyaseo',
    body: 'Best SEO tool I have ever used. The keyword analysis is leagues ahead of the competition. Worth every penny!',
    img: 'https://randomuser.me/api/portraits/women/53.jpg',
    role: 'SEO Specialist',
  },
  {
    name: 'Michael Torres',
    username: '@mtorres',
    body: 'Setup took 2 minutes and the first audit blew my mind. Our site score went from 45 to 92 following the suggestions.',
    img: 'https://randomuser.me/api/portraits/men/33.jpg',
    role: 'Startup Founder',
  },
];

function TestimonialCard({ img, name, username, body, role }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[300px] shrink-0 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-foreground">{name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
        <p className="text-xs text-primary/60 mt-2">{username}</p>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-spacing overflow-hidden relative">
      <div className="container text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">SEO Professionals</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See what our users say about transforming their search rankings with AI.
          </p>
        </motion.div>
      </div>

      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
        <div className="flex gap-4 h-full">
          <Marquee vertical pauseOnHover className="[--duration:25s]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.username} {...t} />
            ))}
          </Marquee>
          <Marquee vertical reverse pauseOnHover className="[--duration:30s]">
            {[...testimonials].reverse().map((t) => (
              <TestimonialCard key={t.username} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover className="[--duration:28s] hidden md:flex">
            {testimonials.map((t) => (
              <TestimonialCard key={t.username} {...t} />
            ))}
          </Marquee>
          <Marquee vertical reverse pauseOnHover className="[--duration:32s] hidden lg:flex">
            {[...testimonials].reverse().map((t) => (
              <TestimonialCard key={t.username} {...t} />
            ))}
          </Marquee>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </div>
    </section>
  );
}
