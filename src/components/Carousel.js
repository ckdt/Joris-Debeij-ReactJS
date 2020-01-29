import React, {useState, useEffect} from 'react';
import EmblaCarouselReact from 'embla-carousel-react';

const Carousel = ({options, children, setActiveIndex, ...props}) => {
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`);
        setActiveIndex(() => embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  return (
    <>
      <EmblaCarouselReact emblaRef={setEmbla} options={options}>
        <div style={{display: 'flex'}}>{children}</div>
      </EmblaCarouselReact>
      <button onClick={() => embla.scrollPrev()}>Prev</button>
      <button onClick={() => embla.scrollNext()}>Next</button>
    </>
  );
};

export default Carousel;
