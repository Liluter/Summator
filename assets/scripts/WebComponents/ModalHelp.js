class ModalHelp extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.isOpen = false;
		this.shadowRoot.innerHTML = `
    <style>
    :host {
      width: 42px;
      height: 42px;
      position: absolute;
      z-index: 100;
      bottom: 10px;
      left: 10px;
    }
    #modal {
      width: 240px;
      height: 320px;
      background: lightgray;
      color: black;
      visibility: collapse;
      opacity: 0;
      position: relative;
      border-radius: 4px;
      left: 10px;
      bottom: 300px;
      padding: 10px 10px 10px 16px;
      transition: opacity 0.2s ease;
      }
    button {
      width: 42px;
      height: 42px;
      font-size: 2rem;
      border-radius: 10px;
      position: absolute;
      border: none;
      bottom:10px;
      left:10px;
      transition : all 0.25s ease;
      &:hover {
        transform: scale(1.1);
      }
      &#closeModal {
        width: 24px;
        height: 24px;
        font-size: 1rem;
        bottom: unset;
        left: unset;
        top: 10px;
        right: 10px;
      }
    }
    </style>
    <button>?</button>
    <div id="modal">
      <p>
      <slot name="message">No help message supported</slot>
      </p>
      <button id="closeModal">x</button>
    </div>
    `;

		const button = this.shadowRoot.querySelector("button");
		button.addEventListener("click", this.openModal.bind(this));

		const closeModal = this.shadowRoot.querySelector("#closeModal");
		closeModal.addEventListener("click", this.closeModal.bind(this));
	}
	openModal() {
		const modal = this.shadowRoot.querySelector("#modal");
		modal.style.opacity = 1;
		modal.style.visibility = "visible";
	}
	closeModal() {
		const modal = this.shadowRoot.querySelector("#modal");
		modal.style.opacity = 0;
		modal.style.visibility = "collapse";
	}
}
customElements.define("uc-modalhelp", ModalHelp);
