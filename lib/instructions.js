class Instructions {
  constructor() {
    this.instructionsEl = document.getElementsByClassName('instructions')[0];
    this.closeInstructionsEl =
      document.getElementsByClassName('close-instructions')[0];
    this.openInstructionsEl =
      document.getElementsByClassName('open-instructions')[0];

    this.closeInstructionsEl.onclick = this.closeInstructions.bind(this);
    this.openInstructionsEl.onclick = this.openInstructions.bind(this);
  }

  closeInstructions() {
    this.instructionsEl.className = "instructions hidden";
  }

  openInstructions() {
    this.instructionsEl.className = "instructions";
  }
}

export default Instructions;
