let coordinates = [];
let connections = [];
let clickedDots = new Set();
let start = null;
let destination = null;

function generateDots() {
  const nodeContainer = document.querySelector('.Node-container');
  nodeContainer.innerHTML = ''; // Clear previous dots

  const dotCount = parseInt(document.getElementById('inputNodes').value) || 50;

  const containerWidth = nodeContainer.offsetWidth;
  const containerHeight = nodeContainer.offsetHeight;

  coordinates = [];

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = `dot-${i}`;

    const x = Math.random() * (containerWidth - 10); // Adjust for dot size
    const y = Math.random() * (containerHeight - 10); // Adjust for dot size

    const coord = { x: x + 5, y: y + 5 };
    coordinates.push(coord);

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    dot.addEventListener('click', () => handleDotClick(dot, coord));

    nodeContainer.appendChild(dot);
  }
}

function handleDotClick(dot, coord) {
  if (dot.classList.contains('clicked')) {
    dot.classList.remove('clicked');
    if (start && start.id === dot.id) {
      start = null;
    } else if (destination && destination.id === dot.id) {
      destination = null;
    }
  } else {
    if (start && destination) {
      console.log("Both start and destination are already selected. Cannot select another dot.");
      return;
    }if (start && destination) {
        console.log("Both start and destination are already selected. Cannot select another dot.");
        return;
      }
    dot.classList.add('clicked');
    if (!start) {
      start = { id: dot.id, coord };
    } else if (!destination) {
      destination = { id: dot.id, coord };
    }
  }
  console.log(start,destination);
}

function handleDotClick(dot, coord) {
    // Check if the dot is already clicked
    if (dot.classList.contains('clicked')) {
      dot.classList.remove('clicked');
      if (start && start.id === dot.id) {
        start = null;
      } else if (destination && destination.id === dot.id) {
        destination = null;
      }
    } else {
      // Check if both start and destination are already selected
      
  
      dot.classList.add('clicked');
      if (!start) {
        start = { id: dot.id, coord };
      } else if (!destination) {
        destination = { id: dot.id, coord };
      }
    }
    console.log(start, destination);
  }

function drawConnection(index) {
    if (index >= connections.length) return;

    const nodeContainer = document.querySelector('.Node-container');
    const [dot1, dot2] = connections[index];
    const line = document.createElement('div');
    line.className = 'line';

    const x1 = dot1.x;
    const y1 = dot1.y;
    const x2 = dot2.x;
    const y2 = dot2.y;

    const length = distance(dot1, dot2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;

    nodeContainer.appendChild(line);

    setTimeout(() => drawConnection(index + 1), 500); // Draw next line after 500ms
}

function distance(dot1, dot2) {
    return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
}

function connectDotsDFS(thresholdId) {
    const nodeContainer = document.querySelector('.Node-container');
    const threshold = parseInt(document.getElementById(thresholdId).value) || 100;

    if (coordinates.length === 0 || threshold === 0) {
        return;
    }

    const visited = new Set();
    connections = [];

    function dfs(dot, idx) {
        visited.add(idx);
        for (let i = 0; i < coordinates.length; i++) {
            if (!visited.has(i) && distance(dot, coordinates[i]) <= threshold) {
                connections.push([dot, coordinates[i]]);
                dfs(coordinates[i], i);
            }
        }
    }

    for (let i = 0; i < coordinates.length; i++) {
        if (!visited.has(i)) {
            dfs(coordinates[i], i);
        }
    }

    drawConnection(0);
}


function connectDotsBFS(thresholdId) {
    const nodeContainer = document.querySelector('.Node-container');
    const threshold = parseInt(document.getElementById(thresholdId).value) || 100;

    if (coordinates.length === 0 || threshold === 0) {
        return;
    }

    const visited = new Set();
    const queue = [];
    const startDot = start.coord;

    queue.push(startDot);
    visited.add(0); // Use index to track visited nodes

    connections = [];

    while (queue.length > 0) {
        const currentDot = queue.shift();
        const currentIndex = coordinates.indexOf(currentDot);

        for (let j = 0; j < coordinates.length; j++) {
            if (!visited.has(j) && distance(currentDot, coordinates[j]) <= threshold) {
                connections.push([currentDot, coordinates[j]]);
                queue.push(coordinates[j]);
                visited.add(j);
            }
        }
    }

    drawConnection(0);
}