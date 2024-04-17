export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    this.animationDefaults = {
      duration: 0.2,
      ease: 'power2.in',
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
    this.highlightedChars.forEach((char, position) => {
      gsap
      .timeline({defaults: this.animationDefaults})
      .fromTo(char, {
        filter: 'brightness(100%) drop-shadow(0px 0px 0px #ff0000)',
        willChange: 'filter',
      }, {
        delay: gsap.utils.random(0,1),
        repeat: 1,
        yoyo: true,
        filter: 'brightness(300%) drop-shadow(0px 0px 50px #ff0000)'
      })
    });
  }
  
  resetChars() {
    gsap.killTweensOf(this.highlightedChars);
    // Reset character properties for a potential re-run of the animation
    gsap.set(this.highlightedChars, {
      opacity: 1
    });
  }
}