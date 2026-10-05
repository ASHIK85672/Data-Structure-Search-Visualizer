let steps = [];
let currentStep = -1;
let autoTimer = null;

function getInputData() {
  const raw = document.getElementById("numbers").value.trim();
  const targetRaw = document.getElementById("target").value.trim();

  if (!raw || targetRaw === "") {
    alert("Please enter a set of numbers and a target number.");
    return null;
  }

  const values = raw
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "")
    .map(Number);

  if (values.length === 0 || values.some(Number.isNaN)) {
    alert("Please enter valid numbers separated by commas.");
    return null;
  }

  const target = Number(targetRaw);
  if (Number.isNaN(target)) {
    alert("Please enter a valid target number.");
    return null;
  }

  return { values, target };
}

function startLinearSearch() {
  stopAutoPlay();
  const input = getInputData();
  if (!input) return;

  const { values, target } = input;
  steps = [];

  steps.push({
    array: [...values],
    active: null,
    discarded: [],
    found: null,
    text: `Linear Search starts from index 0. We will compare every element with target ${target}.`,
    status: "running"
  });

  let foundIndex = -1;

  for (let i = 0; i < values.length; i++) {
    const isFound = values[i] === target;

    steps.push({
      array: [...values],
      active: i,
      discarded: Array.from({ length: i }, (_, k) => k),
      found: isFound ? i : null,
      text: isFound
        ? `Compare arr[${i}] = ${values[i]} with target ${target}. They are equal, so the target is found at index ${i}.`
        : `Compare arr[${i}] = ${values[i]} with target ${target}. They are not equal, so move to the next element.`,
      status: isFound ? "success" : "running"
    });

    if (isFound) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...values],
      active: null,
      discarded: values.map((_, i) => i),
      found: null,
      text: `All ${values.length} elements were checked. Target ${target} is not present in the array.`,
      status: "failed"
    });
  }

  prepareVisualizer("Linear Search");
}

function startBinarySearch() {
  stopAutoPlay();
  const input = getInputData();
  if (!input) return;

  const target = input.target;
  const values = [...input.values].sort((a, b) => a - b);

  steps = [{
    array: [...values],
    active: null,
    left: 0,
    right: values.length - 1,
    discarded: [],
    found: null,
    text: `Binary Search requires a sorted array. Sorted values: ${values.join(", ")}. Start with left = 0 and right = ${values.length - 1}.`,
    status: "running"
  }];

  let left = 0;
  let right = values.length - 1;
  let found = false;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const discarded = values
      .map((_, i) => i)
      .filter(i => i < left || i > right);

    if (values[mid] === target) {
      steps.push({
        array: [...values],
        active: mid,
        left,
        right,
        discarded,
        found: mid,
        text: `Middle index = floor((${left} + ${right}) / 2) = ${mid}. arr[${mid}] = ${values[mid]}, which equals target ${target}. Target found!`,
        status: "success"
      });
      found = true;
      break;
    }

    if (values[mid] < target) {
      steps.push({
        array: [...values],
        active: mid,
        left,
        right,
        discarded,
        found: null,
        text: `Middle index = ${mid}, value = ${values[mid]}. Since ${values[mid]} < ${target}, discard the left half and continue from index ${mid + 1}.`,
        status: "running"
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...values],
        active: mid,
        left,
        right,
        discarded,
        found: null,
        text: `Middle index = ${mid}, value = ${values[mid]}. Since ${values[mid]} > ${target}, discard the right half and continue up to index ${mid - 1}.`,
        status: "running"
      });
      right = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      array: [...values],
      active: null,
      left,
      right,
      discarded: values.map((_, i) => i),
      found: null,
      text: `Now left (${left}) is greater than right (${right}). Target ${target} is not present in the array.`,
      status: "failed"
    });
  }

  prepareVisualizer("Binary Search");
}

function prepareVisualizer(title) {
  currentStep = 0;
  document.getElementById("algorithmTitle").textContent = title;
  document.getElementById("prevBtn").disabled = false;
  document.getElementById("nextBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
  renderStep();
}

function renderStep() {
  if (!steps.length || currentStep < 0) return;

  const step = steps[currentStep];
  const arrayView = document.getElementById("arrayView");
  arrayView.innerHTML = "";

  step.array.forEach((value, index) => {
    const item = document.createElement("div");
    item.className = "array-item";

    if (step.discarded && step.discarded.includes(index)) {
      item.classList.add("discarded");
    }

    if (step.active === index) {
      item.classList.add("active");
    }

    if (step.found === index) {
      item.classList.remove("active");
      item.classList.add("found");
    }

    if (
      step.left !== undefined &&
      step.right !== undefined &&
      (index === step.left || index === step.right)
    ) {
      item.classList.add("boundary");
    }

    item.innerHTML = `<strong>${value}</strong><small>index ${index}</small>`;
    arrayView.appendChild(item);
  });

  document.getElementById("stepText").textContent =
    `Step ${currentStep + 1} of ${steps.length}: ${step.text}`;

  const badge = document.getElementById("statusBadge");
  badge.className = "badge";

  if (step.status === "success") {
    badge.classList.add("success");
    badge.textContent = "Found";
  } else if (step.status === "failed") {
    badge.classList.add("failed");
    badge.textContent = "Not Found";
  } else {
    badge.classList.add("running");
    badge.textContent = "Searching";
  }

  document.getElementById("prevBtn").disabled = currentStep === 0;
  document.getElementById("nextBtn").disabled = currentStep === steps.length - 1;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    stopAutoPlay();
  }
}

function previousStep() {
  stopAutoPlay();
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
}

function autoPlay() {
  if (!steps.length) return;

  const btn = document.getElementById("autoBtn");

  if (autoTimer) {
    stopAutoPlay();
    return;
  }

  btn.textContent = "Stop Auto";

  autoTimer = setInterval(() => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      stopAutoPlay();
    }
  }, 1200);
}

function stopAutoPlay() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  const btn = document.getElementById("autoBtn");
  if (btn) btn.textContent = "Auto Play";
}

function resetVisualizer() {
  stopAutoPlay();
  steps = [];
  currentStep = -1;

  document.getElementById("algorithmTitle").textContent =
    "Choose a Search Algorithm";
  document.getElementById("arrayView").innerHTML = "";
  document.getElementById("stepText").textContent =
    "Enter values and select Linear Search or Binary Search.";

  const badge = document.getElementById("statusBadge");
  badge.className = "badge neutral";
  badge.textContent = "Ready";

  document.getElementById("prevBtn").disabled = true;
  document.getElementById("nextBtn").disabled = true;
  document.getElementById("autoBtn").disabled = true;
}

function showCode(type, button) {
  document.getElementById("linearCode").classList.toggle("hidden", type !== "linear");
  document.getElementById("binaryCode").classList.toggle("hidden", type !== "binary");

  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  button.classList.add("active");
}
