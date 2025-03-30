import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./carousel";

/**
 * @typedef {Object} Testimonial
 * @property {string} company - Company name
 * @property {string} avatar - Avatar image filename
 * @property {string} name - Person's name
 * @property {string} role - Person's role
 * @property {string} review - Testimonial text
 */

/**
 * TestimonialCarousel Component
 * @param {Object} props - Component props
 * @param {Testimonial[]} props.testimonials - Array of testimonial objects
 * @param {string} [props.companyLogoPath=""] - Base path for company logos
 * @param {string} [props.avatarPath=""] - Base path for avatar images
 * @param {string} [props.className] - Additional CSS classes
 */
const TestimonialCarousel = React.forwardRef(
  ({ className, testimonials, companyLogoPath = "", avatarPath = "", ...props }, ref) => {
    const [api, setApi] = React.useState(null);
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) return;
      const unsubscribe = api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
      return unsubscribe;
    }, [api]);

    const scrollPrev = React.useCallback(() => {
      api?.scrollTo(current > 0 ? current - 1 : testimonials.length - 1);
    }, [api, current, testimonials.length]);

    const scrollNext = React.useCallback(() => {
      api?.scrollTo(current < testimonials.length - 1 ? current + 1 : 0);
    }, [api, current, testimonials.length]);

    return (
      <div ref={ref} className={cn("py-16 relative", className)} {...props}>
        <Carousel
          setApi={setApi}
          className="max-w-screen-xl mx-auto px-4 lg:px-8"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.company}
                className="flex flex-col items-center cursor-grab"
              >
                <div className="mb-7 relative h-8 w-32">
                  {companyLogoPath && (
                    <img
                      src={`${companyLogoPath}${testimonial.company}.svg`}
                      alt={`${testimonial.company} logo`}
                      className="object-contain w-full h-full"
                      draggable={false}
                    />
                  )}
                </div>
                <p className="max-w-xl text-center text-xl sm:text-2xl text-foreground">
                  {testimonial.review}
                </p>
                <h5 className="mt-5 font-medium text-muted-foreground">
                  {testimonial.name}
                </h5>
                <h5 className="mt-1.5 font-medium text-foreground/40">
                  {testimonial.role}
                </h5>
                <div className="mt-5 relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={`${avatarPath}${testimonial.avatar}`}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
            <button 
              onClick={scrollPrev}
              className="carousel-arrow carousel-arrow-left"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
            <button 
              onClick={scrollNext}
              className="carousel-arrow carousel-arrow-right"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </Carousel>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === current ? "bg-primary" : "bg-primary/35"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel }; 