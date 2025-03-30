import React from 'react'
import { GradientButton } from "@/components/ui/gradient-button"

function GradientButtonDemo() {
  return (
    <div className="flex gap-8">
      <GradientButton>Order Now</GradientButton>
      <GradientButton variant="variant">View Menu</GradientButton>
    </div>
  )
}

export default GradientButtonDemo 