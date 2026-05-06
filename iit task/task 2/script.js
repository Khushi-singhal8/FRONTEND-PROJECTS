let selectedDot = null;
const connections = [];

const svg = document.getElementById('svgArea');
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    if (!selectedDot) {
      selectedDot = dot;
      dot.style.border = '3px solid blue';
    } else if (selectedDot !== dot) {
      createLine(selectedDot, dot);
      connections.push([selectedDot.id, dot.id]);
      selectedDot.style.border = 'none';
      selectedDot = null;
    } else {
      selectedDot.style.border = 'none';
      selectedDot = null;
    }
  });
});

function createLine(dot1, dot2) {
  const rect1 = dot1.getBoundingClientRect();
  const rect2 = dot2.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - svgRect.left;
  const y1 = rect1.top + rect1.height / 2 - svgRect.top;
  const x2 = rect2.left + rect2.width / 2 - svgRect.left;
  const y2 = rect2.top + rect2.height / 2 - svgRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);
}

function checkConnections() {
  const valid = [
    ['A', 'B'],
    ['C', 'D'],
    ['E', 'F']
  ];

  const normalized = connections.map(pair =>
    pair[0] < pair[1] ? pair : [pair[1], pair[0]]
  );

  const allCorrect = valid.every(v =>
    normalized.some(c => c[0] === v[0] && c[1] === v[1])
  ) && normalized.length === 3;

  if (allCorrect) {
    alert("Right Connections!");
  } else {
    alert("Wrong Connections!");
  }
}

function resetConnections() {
  svg.innerHTML = '';
  connections.length = 0;
  if (selectedDot) {
    selectedDot.style.border = 'none';
    selectedDot = null;
  }
}
