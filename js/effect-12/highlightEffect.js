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
      duration: 1.2,
      ease: 'expo',
    };
    
    // Calls the method to set up the initial effect.
    this.initializeEffect(this.wrapElement);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    // Number of times to duplicate .word
    const duplicates = 8;
    // Initialize an array to hold the .word clones
    let clonedWords = [];
    // Loop to create and append clones
    for (let i = 0; i < duplicates; i++) {
      const clone = this.highlightedWord.cloneNode(true); // Clone the element with all children
      this.highlightedWord.parentNode.appendChild(clone);
      clonedWords.push(clone); 
    }
    // Store the cloned .char elements
    this.highlightedWordClones = clonedWords;
    
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
    gsap.timeline({defaults: this.animationDefaults})
    .fromTo(this.highlightedWordClones, {
      yPercent: 150,
      opacity: 0
    }, {
      stagger: .15,
      yPercent: 0,
      opacity: 1
    })
    .to(this.highlightedWordClones, {
      stagger: .15,
      opacity: 0,
      duration: 0.01  // very short duration to mimic immediate set
    }, this.animationDefaults.duration)
    .to(this.highlightedWord, {
      color: getComputedStyle(this.highlightedElement).getPropertyValue('--color-highlight-end'),
    }, this.animationDefaults.duration + .15 * this.highlightedWordClones.length - 1)
  }

  resetChars() {
    gsap.killTweensOf([this.highlightedWordClones, this.highlightedWord]);
    gsap.set([this.highlightedWordClones], {
      opacity: 0
    });
    gsap.set([this.highlightedWord], {
      color: ''
    });
  }
}