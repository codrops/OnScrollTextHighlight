export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');
    this.animationDefaults = {
      duration: 0.1,
      ease: 'sine',
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
    .to(this.highlightedChars, { 
      stagger: (pos,_,arr) => 0.06*(arr.length-1-pos),
      opacity: 0 
    })
    .to(this.highlightedChars, { 
      stagger: pos => 0.2+0.05*pos,
      opacity: 1 
    })
    .fromTo(this.highlightedElement, {
      '--after-width': '0%',
      willChange: 'height'
    }, {
      duration: 1,
      ease: 'power4',
      '--after-width': getComputedStyle(this.highlightedElement).getPropertyValue('--after-width-final')
    }, '<');
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedChars, this.highlightedElement]);
    gsap.set(this.highlightedElement, {
      '--after-width': '0%'
    });
  }
}