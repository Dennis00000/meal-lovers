import React from "react"
import { TestimonialsSection } from "@/components/ui/testimonials-section"

const testimonials = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@foodie_sarah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The Margherita Pizza from Meal Lovers is absolutely divine! Fresh ingredients and perfect crust. Their delivery is always on time and the food arrives hot.",
    href: "#"
  },
  {
    author: {
      name: "Michael Chen",
      handle: "@chefmike",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "I order their Classic Burger at least once a week. The quality is consistent and the special sauce is incredible. Best food delivery service in town!",
    href: "#"
  },
  {
    author: {
      name: "Emily Rodriguez",
      handle: "@em_eats",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The Spaghetti Carbonara is restaurant quality! I love how easy the app makes it to customize orders. My family's go-to for dinner on busy weeknights."
  },
  {
    author: {
      name: "James Wilson",
      handle: "@wilson_dines",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their Chocolate Brownie dessert is to die for! Warm, gooey, and perfect with ice cream. Meal Lovers has transformed our family dinner experience."
  }
]

export default function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Loved by food enthusiasts everywhere"
      description="Join thousands of customers who are already enjoying our delicious meals delivered right to their doorstep"
      testimonials={testimonials}
    />
  )
} 