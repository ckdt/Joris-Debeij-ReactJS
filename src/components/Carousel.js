// Import Defaults
import React, {useState, useEffect} from 'react';

// Import Carousel
import EmblaCarouselReact from 'embla-carousel-react';

// Import Assets
import left from '../assets/images/arrow-left.svg';
import right from '../assets/images/arrow-right.svg';

// Component: Carousel
const Carousel = ({options, children, setActiveIndex, activeIndex, ...props}) => {
  const [embla, setEmbla] = useState(null);
  const [isLastSlide, setLastSlide] = useState(false);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        const current = embla.selectedScrollSnap();
        const total = embla.slideNodes().length - 1;
        if (current == total) {
          setLastSlide(true);
        } else {
          setLastSlide(false);
        }

        console.log(setActiveIndex, activeIndex, current, '/', total);
        setActiveIndex(current);
      });
    }
  }, [embla]);

  return (
    <>
      <EmblaCarouselReact emblaRef={setEmbla} options={options} setActiveIndex={setActiveIndex}>
        <div style={{display: 'flex'}}>{children}</div>
      </EmblaCarouselReact>
      <div className="slidecontrols">
        <img
          src={left}
          alt="Previous"
          className={`slidenav slidenav__prev ${activeIndex === 0 ? 'is-disabled' : ''}`}
          onClick={() => embla.scrollPrev()}
        />

        <img
          src={right}
          alt="Next"
          className={`slidenav slidenav__next ${isLastSlide ? 'is-disabled' : ''}`}
          onClick={() => embla.scrollNext()}
        />
      </div>
    </>
  );
};

// Export: Carousel
export default Carousel;
