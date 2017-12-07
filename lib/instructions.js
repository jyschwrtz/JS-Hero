class Instructions {
  constructor() {
    this.instructionsEl = document.getElementsByClassName('instructions')[0];
    this.closeInstructionsEl =
      document.getElementsByClassName('close-instructions')[0];

    this.closeInstructionsEl.onclick = this.closeInstructions.bind(this);
  }

  closeInstructions() {
    this.instructionsEl.className = "instructions hidden";
  }
}

export default Instructions;
