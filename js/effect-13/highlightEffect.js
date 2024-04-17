export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.selectMarker = this.highlightedElement.querySelector('.hx__select');
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');

    this.animationDefaults = {
      duration: 0.4,
      ease: 'power1.inOut',
    };
    
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
    ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: 'top bottom',
      onEnter: () => this.animateChars(),
      onEnterBack: () => this.animateChars(),
      // Reset the character's state when scrolling back past the element
      onLeave: () => this.resetChars(),
      onLeaveBack: () => this.resetChars()
    });
  }

  animateChars() {
    gsap
    .timeline({defaults: this.animationDefaults})
    .fromTo(this.highlightedChars, {
      willChange: 'filter',
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    }, { 
      stagger: 0.03,
      filter: 'drop-shadow(0px 0px 20px #ffdbf5)'
    })
    .to(this.selectMarker, {
      duration: 0.8,
      ease: 'expo',
      '--select-width': getComputedStyle(this.highlightedElement).getPropertyValue('--select-width-final'),
    }, 0);
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedChars, this.selectMarker]);
    gsap.set(this.selectMarker, {
      '--select-width': '0%',
    });
    gsap.set(this.highlightedChars, {
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    });
  }
}