import { HighlightEffect as HighlightEffect1 } from './effect-1/highlightEffect.js';
import { HighlightEffect as HighlightEffect2 } from './effect-2/highlightEffect.js';
import { HighlightEffect as HighlightEffect3 } from './effect-3/highlightEffect.js';
import { HighlightEffect as HighlightEffect4 } from './effect-4/highlightEffect.js';
import { HighlightEffect as HighlightEffect5 } from './effect-5/highlightEffect.js';
import { HighlightEffect as HighlightEffect6 } from './effect-6/highlightEffect.js';
import { HighlightEffect as HighlightEffect7 } from './effect-7/highlightEffect.js';
import { HighlightEffect as HighlightEffect8 } from './effect-8/highlightEffect.js';
import { HighlightEffect as HighlightEffect9 } from './effect-9/highlightEffect.js';
import { HighlightEffect as HighlightEffect10 } from './effect-10/highlightEffect.js';
import { HighlightEffect as HighlightEffect11 } from './effect-11/highlightEffect.js';
import { HighlightEffect as HighlightEffect12 } from './effect-12/highlightEffect.js';
import { HighlightEffect as HighlightEffect13 } from './effect-13/highlightEffect.js';
import { preloadFonts } from './utils.js';

// Registers the ScrollTrigger and Flip plugins with GSAP
gsap.registerPlugin(ScrollTrigger, Flip);

const highlightedElements = document.querySelectorAll('.hx');
highlightedElements.forEach(el => {
  // Exclude the 11th example (Flip example) by checking if the element has the class 'hx-11'
  if ( !el.classList.contains('hx-11') ) {
    el.dataset.splitting = '';
  }
});
Splitting();

const init = () => {
  const effects = [
    { selector: '.hx-1', effect: HighlightEffect1 },
    { selector: '.hx-2', effect: HighlightEffect2 },
    { selector: '.hx-3', effect: HighlightEffect3 },
    { selector: '.hx-4', effect: HighlightEffect4 },
    { selector: '.hx-5', effect: HighlightEffect5 },
    { selector: '.hx-6', effect: HighlightEffect6 },
    { selector: '.hx-7', effect: HighlightEffect7 },
    { selector: '.hx-8', effect: HighlightEffect8 },
    { selector: '.hx-9', effect: HighlightEffect9 },
    { selector: '.hx-10', effect: HighlightEffect10 },
    { selector: '.hx-11', effect: HighlightEffect11 },
    { selector: '.hx-12', effect: HighlightEffect12 },
    { selector: '.hx-13', effect: HighlightEffect13 },
  ];

  // Iterate over each effect configuration and apply the effect to all matching elements
  effects.forEach(({ selector, effect }) => {
    document.querySelectorAll(selector).forEach(el => {
      new effect(el);
    });
  });
};

// Preload images and fonts and remove loader
preloadFonts('sem5iwx').then(() => {
  document.body.classList.remove('loading');
  init();
});
