export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedWords = this.highlightedElement.querySelectorAll('.word');
    this.animationDefaults = {
      duration: 1.2,
      ease: 'elastic.out(0.7)',
    };
    
    // Calls the method to set up the initial effect.
    this.initializeEffect(this.wrapElement);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    gsap.set(this.highlightedWords, {transformOrigin: '0% 50%'});

    // Scroll effect.
    this.scroll();
  }

  // Defines the scroll effect logic for the element.
  scroll() {
    ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: 'top bottom',
      onEnter: () => this.animateWords(),
      onEnterBack: () => this.animateWords(),
      // Reset the character's state when scrolling back past the element
      onLeave: () => this.resetWords(),
      onLeaveBack: () => this.resetWords()
    })
  }

  animateWords() {
    // Start the animation chain for a word
    gsap
    .timeline({defaults: this.animationDefaults})
    .fromTo(this.highlightedWords, {
      opacity: 0,
      rotationZ: -30
    }, {
      stagger: 0.2,
      opacity: 1,
      rotationZ: 0,
      color: getComputedStyle(this.highlightedElement).getPropertyValue('--color-highlight-end'),
    });
  }
  
  resetWords() {
    gsap.killTweensOf(this.highlightedWords);
    // Reset word properties for a potential re-run of the animation
    gsap.set(this.highlightedWords, {
      opacity: 1,
      rotationZ: 0,
      color: '',
    });
  }
}