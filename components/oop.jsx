import { backdropClasses } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import React from 'react';

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertFirst(data) {
    let node = new Node(data, this.head);
    this.head = node;
    this.size++;
  }
  insertLast(data) {
    let node = new Node(data);
    let current;
    current = this.head;

    if (!this.head) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  insertAt(data, index) {
    if (index > 0 && index > this.size) {
      return;
    }
    let current, previous;
    let count = 0;
    let node = new Node(data);
    current = this.head;
    if (index === 0) {
      this.head = new Node(data, this.head);
    } else {
      while (count < index) {
        previous = current;
        count++;
        current = current.next;
      }
      node.next = current;
      previous.next = node;
    }
    this.size++;
  }
  getAt(index) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (count === index) {
      }
      count++;
      current = current.next;
    }
  }

  removeAt(index) {
    let current, previous;
    let count = 0;
    current = this.head;
    if (index > 0 && index > this.size) {
      return;
    }
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        previous = current;
        count++;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
  printList() {
    let current = this.head;
    while (current) {
      current = current.next;
    }
  }
  clearList() {
    this.head = null;
    this.size = 0;
  }
}

const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(200);
ll.insertLast(500);
ll.insertLast(600);
ll.insertAt(800, 2);
ll.removeAt(0);

// ll.clearList();
// ll.printList();

class Shape {
  constructor(name, radius) {
    this.name = name;
    this.radius = radius;
  }
  getName() {
    return this.name;
  }

  getArea() {
    return this.radius * 3.14;
  }
}

class Circle extends Shape {
  constructor(name, radius) {
    super(name, radius);
  }
}
class RightTriangle extends Shape {
  constructor(name, height, length) {
    super(name);
    this.length = length;
    this.height = height;
  }
  getArea() {
    return this.height + this.length;
  }
}
const shape = new Shape('Hinh chung', 10);
const circle = new Circle('Hinh tron', 10);
const rightTriangle = new RightTriangle('Hinh tam giac', 1.02, 3.03);

class ListNode {
  constructor(data = 0, next = null) {
    this.data = data;
    this.next = next;
  }
}

const twoSum = (arr, target) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

const palindromenumber = (x) => {
  const data = x.toString();
  const reveredData = data.split('').reverse().join('');
  return data === reveredData;
};

const romanToInterger = (s) => {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanValues[s[i]];
    const nextValue = romanValues[s[i + 1]];

    if (nextValue && currentValue < nextValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
  }
  return result;
};

const addTwoNumbers = (l1, l2) => {
  const result = new Node(0);
  let current = result;
  let carry = 0;

  while (l1 || l2 || carry) {
    let val1 = l1 ? l1.data : 0;
    let val2 = l2 ? l2.data : 0;
    const sum = val1 + val2 + carry;

    current.next = new Node(sum % 10);
    current = current.next;

    carry = Math.floor(sum / 10);

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return result.next;
};
const lengthOfLongestSubstring = (string) => {
  let maxLength = 0;
  let start = 0;
  const charSet = new Set();

  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i];

    while (charSet.has(currentChar)) {
      charSet.delete(string[start]);
      start++;
    }
    charSet.add(currentChar);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
};
lengthOfLongestSubstring('pwwkewabc');

const findMedianSortedArrays = (nums1, nums2) => {
  const mergedArray = nums1.concat(nums2).sort((a, b) => a - b);

  const medianIndex = Math.floor(mergedArray.length / 2);

  if (mergedArray.length % 2 === 1) {
    return mergedArray[medianIndex];
  } else {
    const median =
      (mergedArray[medianIndex] + mergedArray[medianIndex - 1]) / 2;

    return median;
  }
};

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap two elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort([2, 4, 5, 6]));

function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      // Swap two elements
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const arr1 = [1, 2, 5];
const arr2 = [3, 4, 6];

const palindrome = (x) => {
  const data = x.toString();

  const reveredData = data.split('').reverse().join('');

  return data === reveredData;
};

const l1 = { data: 2, next: { data: 4, next: { data: 3, next: null } } };

const l2 = { data: 5, next: { data: 6, next: { data: 4, next: null } } };

const romanToInt = (s) => {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanValues[s[i]];
    const nextValue = romanValues[s[i + 1]];
    if (nextValue && currentValue < nextValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
  }

  return result;
};
romanToInt('XIV');

const longestCommonPrefix = (strs) => {
  if (strs.length === 0) return '';

  return strs.reduce((acc, cur) => {
    let i = 0;
    while (acc[i] && acc[i] === cur[i]) {
      i++;
    }
    return acc.slice(0, i);
  }, strs[0]);
};

function isValid(s) {
  const stack = [];

  const bracketPairs = {
    '(': ')',
    '{': '}',
    '[': ']',
  };
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (bracketPairs[char]) {
      stack.push(char);
    } else {
      if (stack.length === 0 || bracketPairs[stack.pop()] !== char) {
        return false;
      } else {
        stack.length === 0;
      }
    }
  }
  return stack.length === 0;
}

const mergeSortedArrays = (l1, l2) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < l1.length && j < l2.length) {
    if (l1[i] < l2[j]) {
      result.push(l1[i]);
      i++;
    } else {
      result.push(l2[j]);
      j++;
    }
  }
  while (i < l1.length) {
    result.push(l1[i]);
    i++;
  }
  while (i < l2.length) {
    result.push(l2[j]);
  }
  return result;
};

const mergeTwoLists = (list1, list2) => {
  // const mainNode = new ListNode(0);
  // let current = mainNode;
  // while (list1 !== null && list2 !== null) {
  //   if (list1.data < list2.data) {
  //     current.next = list1;
  //     list1 = list1.next;
  //   } else {
  //     current = list2;
  //     list2 = list2.next;
  //   }
  //   current = current.next;
  // }
  // if (list1 !== null) {
  //   current.next = list1;
  // }
  // if (list2 !== null) {
  //   current.next = list2;
  // }
  // return mainNode.next;
};

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(4);

const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

const mergedList = mergeTwoLists(list1, list2);

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let count = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[count]) {
      count++;
      nums[count] = nums[i];
    }
  }
  return nums.slice(0, count + 1);
}

// Test
const nums = [1, 2, 2, 3];
const result = removeDuplicates(nums);

const OopPage = () => {
  return <div>oop</div>;
};

export default OopPage;
