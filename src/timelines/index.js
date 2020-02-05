import {TimelineMax as Timeline, Power1} from 'gsap';

const getDefaultTimeline = (node, delay) => {
  const timeline = new Timeline({paused: true});
  console.log('animate', node);

  return timeline;
};

const getHomeTimeline = (node, delay) => {
  const timeline = new Timeline({paused: true});

  console.log('homeTimeLine', node, delay);
  // const covers = node.querySelectorAll('.cover');

  // timeline
  //   .from(node, 0, {display: 'none', autoAlpha: 0, delay})
  //   .staggerFrom(covers, 0.375, {autoAlpha: 0, x: -25, ease: Power1.easeOut}, 0.125);

  return timeline;
};

export const play = (pathname, node, appears) => {
  console.log('play', pathname, node, appears);

  const delay = appears ? 0 : 0.5;
  let timeline;

  if (pathname === '/') timeline = getHomeTimeline(node, delay);
  else timeline = getDefaultTimeline(node, delay);

  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
};

export const exit = node => {
  const timeline = new Timeline({paused: true});
  timeline.to(node, 0.55, {autoAlpha: 0, ease: Power1.easeOut});
  timeline.play();

  console.log('exit', node);
  return timeline;
};
