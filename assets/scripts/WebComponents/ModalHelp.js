class ModalHelp extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
    <style>
    :host {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      margin:0;
    }
    #modal {
      width: 40vw;
      max-height: 50vh;
      background: #ebebeb;
      color: black;
      visibility: collapse;
      
      opacity: 0;
      position: absolute;
      border-radius: 4px;
      left: 30vw;
      top: 25vh;
      padding: 10px 10px 10px 16px;
      box-shadow: 0px 0px 8px 0px  rgba(0,0,0, 0.6);
      transition: opacity 0.2s ease;
    }
    section {
      max-height: 18rem;
      overflow: auto;
    }
    header h3 {
      margin:10px 0;
    }
    button {
      border-radius: 10px;
      position: absolute;
      border: none;
      transition : all 0.25s ease;
      box-shadow: 0px 0px 8px 0px  rgba(0,0,0, 0.6);
      &:hover {
        transform: scale(1.1);
      }
      &#closeModal {
        width: 24px;
        height: 24px;
        font-size: 1rem;
        bottom: unset;
        left: unset;
        top: -8px;
        right: -8px;
      }
    }
    </style>
    <div id="modal">
    <header>
    </header>
    <hr>
    <section>
    </section>
    <button id="closeModal">x</button>
    </div>
    `;

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

	editContent(newTitle, textContent) {
		const title = document.createElement("h3");
		title.textContent = newTitle;
		const header = this.shadowRoot.querySelector("header");
		header.replaceChildren();
		header.append(title);

		const content = document.createElement("h4");
		content.textContent = textContent;
		const section = this.shadowRoot.querySelector("section");
		section.replaceChildren();
		section.append(content);
	}
}
customElements.define("uc-modalhelp", ModalHelp);
