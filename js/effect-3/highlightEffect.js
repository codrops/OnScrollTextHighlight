export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    // These are the .word Splitting outputs
    this.animationDefaults = {
      duration: 0.5,
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
    // Start the animation chain for the characters
    gsap
    .timeline({defaults: this.animationDefaults})
    .set(this.highlightedChars, { willChange: 'transform, opacity, color, filter' }) // seems to fix the flickering
    .to(this.highlightedChars, {
      stagger: 0.06,
      opacity: 0,
      scale: 0.8,
    })
    .to(this.highlightedChars, {
      stagger: 0.06,
      opacity: 1, 
      scale: 1,
      color: getComputedStyle(this.highlightedElement).getPropertyValue('--color-highlight-end'),
      startAt: {filter: 'drop-shadow(0px 0px 0px #ffdbf5)'},
      filter: 'drop-shadow(0px 0px 20px #ffdbf5)'
    }, this.animationDefaults.duration);
  }
  
  resetChars() {
    gsap.killTweensOf(this.highlightedChars);
    // Reset character properties for a potential re-run of the animation
    gsap.set(this.highlightedChars, {
      scale: 1,
      opacity: 1,
      color: '',
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    });
  }
}