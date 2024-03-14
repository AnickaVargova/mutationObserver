const observer = new MutationObserver(observerHandler);

const observerTarget = document.querySelector("html");

let isObserving = false;

const start = () => {
  if (!isObserving) {
    console.log('starting the observer');
    observer.observe(observerTarget, config);
    isObserving = true;
  }
};

const stop = () => {
  if (isObserving) {
    console.log('stopping the observer');
    observer.disconnect();
    isObserving = false;
  }
};

const config = {
  subtree: true,
  childList: true,
  attributes: true,
};

const applyAllExperiments = (node) => {
  // the selector must match
  if (!node.classList.contains("paragraphContainer")) {
    return;
  }
  console.log("applying experiment on", node);
  node.insertAdjacentHTML(
    "beforeend",
    "<p class='paragraphContainer'>hi, I am a new paragraph</p>"
  );
};

const applyCallbackOnMutations = (mutations, callback) => {
  mutations.forEach((m) => {
    m.addedNodes.forEach((n) => {
      // only if the added node is an element
      if (n.nodeType === 1) {
        // apply experiments
        callback(n);
      }
    });
  });
};

function observerHandler(mutationsList) {
  console.log("observerHandler called for mutations:", mutationsList);

  applyCallbackOnMutations(mutationsList, applyAllExperiments);

  // pending mutations must be collected right before stopping the observer.
  // If the observer is stopped before applying the callback, there will be no pending mutations.
  // If the observer is not stopped at all, this will result in an endless loop.

  const pendingMutations = observer.takeRecords();
  stop();
  console.log("pending mutations:", pendingMutations);
  pendingMutations.length &&
    applyCallbackOnMutations(pendingMutations, applyAllExperiments);
  start();
}

start();
