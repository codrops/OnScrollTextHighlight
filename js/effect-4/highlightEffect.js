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
      duration: 0.3,
      ease: 'power3.in',
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
    // Start the animation chain for a character
    gsap
    .timeline({defaults: this.animationDefaults})
    .set(this.highlightedChars, { willChange: 'transform, opacity, color' }) // Prepare for animation
    .to(this.highlightedChars, {
      stagger: 0.05,
      scale: 1.45,
      color: getComputedStyle(this.highlightedElement).getPropertyValue('--color-highlight-end'),
    })
    .to(this.highlightedChars, { 
      duration: 0.4,
      ease: 'sine', 
      stagger: 0.05,
      scale: 1,
      color: getComputedStyle(this.highlightedElement).getPropertyValue('--color-highlight-end-alt'),
    }, this.animationDefaults.duration);
  }
  
  resetChars() {
    gsap.killTweensOf(this.highlightedChars);
    // Reset character properties for a potential re-run of the animation
    gsap.set(this.highlightedChars, {
      scale: 1,
      color: '', // Reset color if needed or set to initial color
    });
  }
}