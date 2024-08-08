function drawLine(x1, y1, x2, y2) {
    // Get the canvas element and its context
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // Begin a new path
    context.beginPath();

    // Move to the starting point
    context.moveTo(x1, y1);

    // Draw a line to the ending point
    context.lineTo(x2, y2);

    // Set the line width and color (optional)
    context.lineWidth = 2;
    context.strokeStyle = 'black';

    // Stroke the path
    context.stroke();
}

// Example usage:
drawLine(50, 50, 200, 200);
drawLine(10, 10, 400, 400);
