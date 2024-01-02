console.log("hi there");

const toggle = document.querySelector("#toggle");
const rhubarb = document.querySelector("#rhubarb");
const observerTarget = document.querySelector("body");

const childOutput = document.querySelector("#output");
const attributeOutput = document.querySelector("#attrOutput");

function myFunction() {
  const node = document.createElement("div");

  const textnode = document.createTextNode("Water");
  node.setAttribute("style", "color:blue");
  node.appendChild(textnode);

  const subnode = document.createElement("div");
  const subtextnode = document.createTextNode("Blueberry");

  setTimeout(() => {
    rhubarb.appendChild(node);
  }, 1000); // childlist callback triggered

  setTimeout(() => {
    subnode.appendChild(subtextnode);
    subnode.setAttribute("style", "color:black");
    subnode.setAttribute("id", "blueberry"); // attribute callback triggered

    subnode.innerHTML = '<div><p id="mushroom">Mushroom</p></div>';
    node.appendChild(subnode);
  }, 2000); // childlist callback triggered

  //   setTimeout(() => {
  //     subnode.setAttribute("style", "color:green"); // attribute callback triggered
  //   }, 3000);
}

const myAttrChange = () => {
  const colors = ["red", "blue", "pink", "hotpink", "azure", "grey"];
  setTimeout(() => {
    apple.style.color = colors[Math.floor(Math.random() * colors.length)];
  }, 1000);
};

toggle.addEventListener("click", () => {
  myFunction();
  myAttrChange();
});

const config = {
  subtree: true,
  childList: true,
  attributes: true,
  attributeOldValue: true,
};

const changeTimestampsChild = [];

const callback = (mutationList) => {
  console.log("callback called");
  for (const mutation of mutationList) {
    console.log("xxx mutation", mutation);
    if (mutation.type === "childList") {
      [].forEach.call(mutation.addedNodes, (node) => {
        // document
        //   .getElementById("mushroom")
        //   ?.setAttribute("style", "color: brown");
        // if node is an element (Node.ELEMENT_NODE)
        if (node.nodeType === 1) {
          console.log("adding element");
          node?.setAttribute("style", "color:orange");
        }
      });
      observer.disconnect();
      changeTimestampsChild.push(Date.now());
      childOutput.textContent = `A child element has been changed  ${changeTimestampsChild.length} times .`;

      observer.observe(observerTarget, config);
    } else if (mutation.type === "attributes") {
      myAttrChange();
      observer.disconnect();

      attributeOutput.textContent = `The ${
        mutation.attributeName
      } attribute was modified from "${
        mutation.oldValue
      } , timestamp: "${Date.now()}".`;

      observer.observe(observerTarget, config);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(observerTarget, config);
