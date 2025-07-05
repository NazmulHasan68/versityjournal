import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bg1 from '@/assets/bg/bg1.jpg';
import bg2 from '@/assets/bg/bg2.jpg';
import bg3 from '@/assets/bg/bg3.jpg';

const slides = [
  {
    title: 'AI in Healthcare',
    description: 'Special Issue on Artificial Intelligence in Modern Healthcare',
    image: bg1,
  },
  {
    title: 'Climate & Sustainability',
    description: 'Exploring challenges in environmental research.',
    image: bg2,
  },
  {
    title: 'Data Science Trends',
    description: 'Latest advancements in data analysis and AI.',
    image: bg3,
  },
];

export default function Archives_slider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="max-w-5xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Archives</h2>

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold">{slide.title}</h3>
              <p className="text-sm">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
