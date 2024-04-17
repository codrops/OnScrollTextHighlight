export class HighlightEffect {
  constructor(el) {
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.highlightedElement = el;
    this.highlightedWord = this.highlightedElement.querySelector('.word');
    this.highlightedChars = this.highlightedWord.querySelectorAll('.char');
    this.animationDefaults = {
      duration: 0.2,
      ease: 'sine',
    };
    
    // Calls the method to set up the initial effect.
    this.initializeEffect(this.wrapElement);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    // Duplicate .word
    this.clone = this.highlightedWord.cloneNode(true);
    this.highlightedWord.parentNode.appendChild(this.clone);
    this.highlightedCharsClone = this.clone.querySelectorAll('.char');
    
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
    // Generate an array of random rotation values, one for each character
    const rotations = Array.from(this.highlightedChars, () => gsap.utils.random(-45, 45));

    gsap
    .timeline({defaults: this.animationDefaults})
    .fromTo(this.highlightedChars, {
      opacity: 0,
      yPercent: 80,
      rotation: pos => rotations[pos],
    }, {
      stagger: pos => 0.06*pos,
      opacity: 1,
      yPercent: 0,
      rotation: 0
    })
    .to(this.highlightedCharsClone, {
      duration: 1,
      ease: 'expo',
      stagger: pos => 0.06*pos,
      xPercent: () => gsap.utils.random(-15,15),
      yPercent: () => gsap.utils.random(-130,-50),
      rotation: pos => -1*rotations[pos],
      scale: () => gsap.utils.random(1,2),
      opacity: 0
    }, 0);
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedChars, this.highlightedCharsClone, this.highlightedElement]);
    gsap.set([this.highlightedChars,this.highlightedCharsClone], {
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      scale: 1
    });
  }
}