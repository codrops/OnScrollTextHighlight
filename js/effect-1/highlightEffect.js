export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    // These are the .word Splitting outputs
    this.highlightedWords = this.highlightedElement.querySelectorAll('.word');
    this.animationDefaults = {
      duration: 0.8,
      ease: 'power2'
    };
    
    // Calls the method to set up the initial effect.
    this.initializeEffect(this.wrapElement);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    gsap.set(this.highlightedElement, { perspective: 500 });
    gsap.set(this.highlightedWords, { transformStyle: 'preserve-3d' });

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
      opacity: 0,
      z: 300,
      rotationX: () => -45,
    },
    {
      stagger: 0.04,
      opacity: 1,
      z: 0,
      rotationX: 0,
    }, 0);
  }

  resetChars() {
    gsap.killTweensOf(this.highlightedChars);
    gsap.set(this.highlightedChars, {
      opacity: 1,
      z: 0,
      rotationX: 0
    });
  }
}