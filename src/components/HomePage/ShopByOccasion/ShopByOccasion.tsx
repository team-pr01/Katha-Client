import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import { useGetAllOccasionsQuery } from "../../../redux/Features/Occation/occasionApi";
import type { TOccasion } from "../../../types/occasion.type";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ShopByOccasion = () => {
  const { data } = useGetAllOccasionsQuery({});
  const occasions = data?.data?.data || [];
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Container>
      <div className="py-16 font-Manrope">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-neutral-10" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-10 font-medium">
                Shop by Occasion
              </span>
            </div>
            <h2 className="text-6xl font-bold text-neutral-10 leading-[0.95] tracking-tight">
              Gifts for
              <span className="block italic font-light text-primary-10">
                every moment
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-neutral-45 max-w-xs md:text-right">
              Find the perfect gift for life's most cherished celebrations.
            </p>

            {/* Scroll Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                         border-neutral-10 text-neutral-10 hover:bg-neutral-10 hover:text-white`}
                aria-label="Scroll left"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                         border-primary-10 text-primary-10 hover:bg-primary-10 hover:text-white`}
                aria-label="Scroll right"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        {/* Header */}
        {/* <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-neutral-5">
            Shop by Occasion
          </h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex size-7 items-center justify-center rounded-full bg-neutral-20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <img
                src={ICONS.arrowRight}
                alt="Previous"
                className="size-5 rotate-180"
              />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex size-7 items-center justify-center rounded-full bg-primary-10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <img src={ICONS.arrowRightWhite} alt="Next" className="size-5" />
            </button>
          </div>
        </div> */}

        {/* Carousel */}
        <div className="mt-6">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={3}
            spaceBetween={24}
            pagination={{
              clickable: true,
              el: ".occasion-pagination",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="shop-occasion-swiper"
          >
            {occasions?.map((occasion: TOccasion) => (
              <SwiperSlide key={occasion?._id}>
                <div className="relative h-full overflow-hidden rounded-2xl">
                  {/* Image */}
                  <img
                    src={occasion?.imageUrl}
                    alt={occasion?.name}
                    className="aspect-4/3 h-full w-full object-cover"
                  />

                  {/* Bottom dark gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  {/* Collections Badge */}
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-white/70 px-4 py-2 text-xs text-neutral-10 backdrop-blur-sm">
                    {occasion?.productCount} Collection
                    {occasion?.productCount > 1 ? "s" : ""}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-4 px-6 py-5">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {occasion?.name}
                      </h3>

                      <p className="mt-2 max-w-75 text-sm leading-tight text-white/90">
                        {occasion?.description}
                      </p>
                    </div>

                    <Link to={`/products?occasion=${occasion?.name}`}>
                      <Button label="View" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots */}
          <div className="occasion-pagination mt-6 flex justify-center gap-2" />
        </div>
      </div>
    </Container>
  );
};

export default ShopByOccasion;
