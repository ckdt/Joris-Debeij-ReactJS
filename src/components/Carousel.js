import React, {useState, useEffect} from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import left from '../images/arrow-left.svg';
import right from '../images/arrow-right.svg';

const Carousel = ({options, children, activeIndex, setActiveIndex, ...props}) => {
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
        console.log(current, '/', total);
        setActiveIndex(current);
      });
    }
  }, [embla]);

  return (
    <>
      <EmblaCarouselReact emblaRef={setEmbla} options={options}>
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

export default Carousel;
