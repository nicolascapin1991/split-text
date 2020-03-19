class SplitText {
  constructor(el) {
    this.el = el;

    this.split = this.split.bind(this);

    this.init();
  }

  init() {
    const words = this.el.textContent.split(" ");
    this.nodes = [];

    words.forEach(word => {
      const wrapper = document.createElement("span");
      wrapper.textContent = word;
      this.nodes.push(wrapper);
    });

    this.handleResize();
    this.split();
  }

  delete() {
    window.removeEventListener("resize", this.split);
  }

  handleResize() {
    window.addEventListener("resize", this.split);
  }

  split() {
    this.el.innerHTML = "";

    let lastOffset = 0;
    this.lines = [];
    let line = [];

    this.nodes.forEach((node, index, nodes) => {
      if (index !== 0) this.el.appendChild(document.createTextNode(" "));

      this.el.appendChild(node);

      let nodeOffset = node.offsetTop;

      if (index === 0) lastOffset = nodeOffset;

      if (nodeOffset !== lastOffset) {
        this.lines.push(line);
        line = [];
        lastOffset = nodeOffset;
      }

      line.push(node);

      if (index === nodes.length - 1) {
        this.lines.push(line);
      }
    });

    this.el.innerHTML = "";

    this.lines.forEach(line => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("line");
      wrapper.textContent = line.map(node => node.textContent).join(" ");
      this.el.appendChild(wrapper);
    });
  }
}

export default SplitText;
