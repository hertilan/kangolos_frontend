import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';


const testimonials = [
  {
    id: 1,
    name: "Dr. Alice Uwase",
    role: "Head of Computer Science",
    text: "This system has revolutionized how we manage student projects. The efficiency gains are remarkable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Prof. John Mugisha",
    role: "Dean of Engineering",
    text: "The analytics dashboard provides invaluable insights into project progress across all departments.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Marie Kamanzi",
    role: "Research Coordinator",
    text: "Our faculty can now track student progress in real-time, making supervision much more effective.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];
const Testimonial :React.FC= () => {
      const [currentTestimonial, setCurrentTestimonial] = useState(0);
      const [isAnimating, setIsAnimating] = useState(false);

        useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className='relative h-24 w-2/3 overflow-hidden rounded-lg bg-gradient-to-r from-[#1A3753] to-[#00628B]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={testimonials[currentTestimonial].id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ 
                    x: isAnimating ? -300 : 0, 
                    opacity: isAnimating ? 0 : 1 
                  }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className='absolute inset-0 flex items-center p-4 text-white'
                >
                  <div className='flex items-center space-x-4'>
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name}
                      className='w-12 h-12 rounded-full border-2 border-white'
                    />
                    <div>
                      <p className='italic'>"{testimonials[currentTestimonial].text}"</p>
                      <div className='mt-2'>
                        <p className='font-semibold'>{testimonials[currentTestimonial].name}</p>
                        <p className='text-sm text-white/80'>{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Testimonial
