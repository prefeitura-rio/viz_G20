import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Intro.css';
import logoPrefeitura from '../assets/logo_prefeitura.png';
gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const videoRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const videos = videoRefs.current;
    const texts = textRefs.current;

    videos.forEach((video, index) => {
      gsap.fromTo(
        video,
        { opacity: index === 0 ? 1 : 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: texts[index],
            start: 'top center',
            end: 'bottom center',
            onEnter: () => video.play(),
            // onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
            // onLeaveBack: () => video.pause(),
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const videoSources = [
    'https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/G20/2.mp4',
    'https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/G20/1.mp4',
    'https://storage.googleapis.com/rj-escritorio-dev-public/dataviz/G20/3.mp4',
  ];

  return (
    <div className="intro-container">
      <div className="logo-container">
        <img src={logoPrefeitura} alt="Logo" className="logo" />
      </div>
      <div className="video-container">
        {videoSources.map((src, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            className="background-video"
            src={src}
            loop
            muted
          />
        ))}
      </div>

      {/* Scrolling text cards */}
      <div className="text-section">
        <div className="text-card-intro" ref={(el) => (textRefs.current[0] = el)}>
          <h2>Quem decide o futuro do mundo?</h2>
        </div>
        <div className="text-card-intro" ref={(el) => (textRefs.current[1] = el)}>
          <h2>As escolhas feitas pelos líderes globais hoje moldarão a face da Terra nas próximas décadas. Em 2024, o Rio de Janeiro é a sede de um dos maiores encontros entre nações: a Cúpula do G20. </h2>
        </div>
        <div className="text-card-intro3" ref={(el) => (textRefs.current[2] = el)}>
          <h1>G20 EM DADOS</h1>
          <h2>veja como o evento dá destaque geopolítico ao Rio, envolve a cidade e impacta sua economia</h2>
        </div>
      </div>
    </div>
  );
};

export default Intro;