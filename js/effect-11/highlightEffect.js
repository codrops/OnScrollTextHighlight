export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }
    
    this.highlightedElement = el;
    this.flipElementWrap = this.highlightedElement.closest('.content__inner').querySelector('.hx-flip');
    this.flipElement = this.flipElementWrap.querySelector('.hx-flip__inner');
    this.paragraph = this.highlightedElement.parentNode;
    // Calls the method to set up the initial effect.
    this.initializeEffect(this.wrapElement);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    // Scroll effect.
    this.scroll();
  }

  // Defines the scroll effect logic for the element.
  scroll() {
    // Temporarily capture the final state
    gsap.set(this.flipElement, {willChange: 'filter', filter: 'blur(0px)'});
    this.highlightedElement.appendChild(this.flipElement);
    const flipstate = Flip.getState([this.flipElementWrap, this.flipElement], {props: 'font-size, filter'} );
    // Back to the original state
    gsap.set(this.flipElement, {filter: 'blur(6px)'});
    this.highlightedElement.removeChild(this.flipElement);
    this.flipElementWrap.appendChild(this.flipElement);

    const scrollTrigger = {
      trigger: this.flipElement,
      start: 'bottom bottom',
      end: '+=100%',
      scrub: true
    };
    
    // Create the Flip animation
    Flip.to(flipstate, {
      ease: 'sine.inOut',
      absoluteOnLeave: true,
      scrollTrigger: scrollTrigger
    })
    .fromTo(this.paragraph, {
      scale: 0.9,
      filter: 'blur(3px)',
      willChange: 'filter'
    }, {
      ease: 'sine.inOut',
      scale: 1,
      filter: 'blur(0px)',
      scrollTrigger: scrollTrigger
    }, 0);
  }
}