////////////////////////////////////////////////////////////////////////////////////////////////
function generateBars() {
    const input = document.getElementById('inputNumbers').value.trim();
    let numbers;

    // Split the input by spaces and filter out any empty strings
    const inputArray = input.split(' ').filter(num => num !== '');

    if (inputArray.length === 1 && !isNaN(inputArray[0])) {
        // If a single number is given, generate an array of that length with random numbers
        const arrayLength = Number(inputArray[0]);
        numbers = [];
        for (let i = 0; i < arrayLength; i++) {
            numbers.push(Math.floor(Math.random() * 80) + 5);
        }
    } else if (inputArray.length > 1) {
        // If multiple numbers are given, convert them to an array of numbers
        numbers = inputArray.map(Number);
    } else {
        // If the input is empty, generate a default array of 100 random numbers
        numbers = [];
        for (let i = 0; i < 100; i++) {
            numbers.push(Math.floor(Math.random() * 80) + 5);
        }
    }

    const barsContainer = document.getElementById('bars');
    barsContainer.innerHTML = '';

    const len = numbers.length;
    const max = Math.max(...numbers);
    const mult = 300 / max;

    numbers.forEach(number => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${number * mult}px`;
        bar.style.width = `${600 / len}px`;
        bar.style.margin = `0 ${100 / len}px`;
        bar.style.backgroundColor = getColor(number, max);
        barsContainer.appendChild(bar);
    });
}

function getColor(value, max) {
    const hue = (value / max) * 120;
    return `hsl(${hue}, 100%, 50%)`;
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function sortBars(type) {
    const bars = document.querySelectorAll('.bar');
    const numbers = Array.from(bars).map(bar => parseInt(bar.style.height) / 5);

    switch (type) {
        case 'merge':
            await mergeSort(numbers, 0, numbers.length - 1, bars);
            break;
        case 'quick':
            await quickSort(numbers, 0, numbers.length - 1, bars);
            break;
        case 'bubble':
            await bubbleSort(numbers, bars);
            break;
        case 'selection':
            await selectionSort(numbers, bars);
            break;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function mergeSort(arr, l, r, bars) {
    if (l >= r) return;

    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m, bars);
    await mergeSort(arr, m + 1, r, bars);
    await merge(arr, l, m, r, bars);
}

async function merge(arr, l, m, r, bars) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const left = new Array(n1);
    const right = new Array(n2);

    for (let i = 0; i < n1; i++) left[i] = arr[l + i];
    for (let i = 0; i < n2; i++) right[i] = arr[m + 1 + i];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            bars[k].style.height = `${arr[k] * 5}px`;
            bars[k].style.backgroundColor = getColor(arr[k], 80);
            i++;
        } else {
            arr[k] = right[j];
            bars[k].style.height = `${arr[k] * 5}px`;
            bars[k].style.backgroundColor = getColor(arr[k], 80);
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    while (i < n1) {
        arr[k] = left[i];
        bars[k].style.height = `${arr[k] * 5}px`;
        bars[k].style.backgroundColor = getColor(arr[k], 80);
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    while (j < n2) {
        arr[k] = right[j];
        bars[k].style.height = `${arr[k] * 5}px`;
        bars[k].style.backgroundColor = getColor(arr[k], 80);
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function quickSort(arr, low, high, bars) {
    if (low < high) {
        const pi = await partition(arr, low, high, bars);
        await quickSort(arr, low, pi - 1, bars);
        await quickSort(arr, pi + 1, high, bars);
    }
}

async function partition(arr, low, high, bars) {
    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j, bars);
        }
    }
    await swap(arr, i + 1, high, bars);
    return i + 1;
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function bubbleSort(arr, bars) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1, bars);
            }

            bars[j].style.backgroundColor = getColor(arr[j], 80);
            bars[j + 1].style.backgroundColor = getColor(arr[j + 1], 80);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function selectionSort(arr, bars) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = 'red';

        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIdx]) {
                bars[minIdx].style.backgroundColor = getColor(arr[minIdx], 80);
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'red';
            }
        }

        if (minIdx !== i) {
            await swap(arr, i, minIdx, bars);
        }

        bars[minIdx].style.backgroundColor = getColor(arr[minIdx], 80);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////
async function swap(arr, i, j, bars) {
    return new Promise(resolve => {
        setTimeout(() => {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            bars[i].style.height = `${arr[i] * 5}px`;
            bars[i].style.backgroundColor = getColor(arr[i], 80);
            bars[j].style.height = `${arr[j] * 5}px`;
            bars[j].style.backgroundColor = getColor(arr[j], 80);

            resolve();
        }, 200);
    });
}
