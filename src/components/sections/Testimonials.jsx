import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { PiQuotesBold } from 'react-icons/pi'
import SectionHeading from '../ui/SectionHeading'
import { useSetting } from '../../context/SiteDataContext'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
  const testimonials = useSetting('testimonials') || []

  return (
    <section id="testimonials" className="relative bg-cream py-28 sm:py-36">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Reviews"
          title="What Customers Say"
          align="center"
          description="Real words from young men who found their style with us."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.testimonials-pagination' }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          observer
          observeParents
          className="!pb-4 w-full"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <div className="bg-[#FFF3F6] ring-1 ring-pink/15 rounded-2xl p-8 h-full flex flex-col gap-6 shadow-luxury">
                <PiQuotesBold className="text-3xl text-pink/70" />
                <p className="text-graphite/85 leading-relaxed flex-1">{t.quote}</p>
                <div>
                  <p className="font-display text-base text-graphite">{t.name}</p>
                  <p className="text-xs uppercase tracking-wide text-stone mt-0.5">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="testimonials-pagination flex justify-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-graphite/15 [&_.swiper-pagination-bullet-active]:bg-pink [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:transition-colors" />
      </div>
    </section>
  )
}