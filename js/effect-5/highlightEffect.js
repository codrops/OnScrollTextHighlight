export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    this.animationDefaults = {
      duration: 0.4,
      ease: 'power1',
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
      scale: 1.3,
      opacity: 0
    }, { 
      stagger: pos => 0.1+0.05*pos,
      scale: 1,
      opacity: 1
    })
    .fromTo(this.highlightedElement, {
      '--after-scale': 0
    }, {
      duration: 0.8,
      ease: 'expo',
      '--after-scale': 1
    }, 0);
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedChars, this.highlightedElement]);
    gsap.set(this.highlightedElement, {
      '--after-scale': 0
    });
  }
}