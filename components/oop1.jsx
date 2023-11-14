import { current } from '@reduxjs/toolkit';
import React from 'react';
const twoSum = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};
// console.log(twoSum([1, 2, 3, 4], 5));

const palindrome = (x) => {
  let data = x.toString();
  const reveredData = data.split('').reverse().join('');
  return data === reveredData;
};
// console.log(palindrome(121));

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
// console.log(romanToInt('IVV'));

const longestCommonPrefix = (str) => {
  if (str.length == 0) return '';

  return str.reduce((acc, cur) => {
    let i = 0;
    while (acc[i] && acc[i] === cur[i]) {
      i++;
    }
    return acc.slice(0, i);
  }, str[0]);
};
// console.log(longestCommonPrefix(['huhu', 'hung', 'hud']));

const parentheses = (s) => {
  const bracketPairs = {
    '(': ')',
    '{': '}',
    '[': ']',
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];
    if (bracketPairs[currentChar]) {
      stack.push(currentChar);
    } else {
      if (stack.length === 0 || bracketPairs[stack.pop()] !== currentChar) {
        return false;
      } else {
        stack.length === 0;
      }
    }
  }
  return stack.length === 0;
};
// console.log(parentheses('(}()'));

class ListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
const twoSortList = (l1, l2) => {
  const mainNode = new ListNode(0);
  let current = mainNode;

  while (l1 !== null && l2 !== null) {
    if (l1.data < l2.data) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  if (l1 !== null) {
    current.next = l1;
  }
  if (l2 !== null) {
    current.next = l2;
  }

  return mainNode.next;
};

// console.log(twoSortList(list1, list2));

const removeDuplicates = (arr) => {
  if (arr.length === 0) return 0;
  let count = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[count] !== arr[i]) {
      count++;
      arr[count] = arr[i];
    }
  }
  return arr.slice(0, count + 1);
};
const hung = removeDuplicates([1, 1, 2, 3, 4, 5]);

// console.log(removeDuplicates([1, 1, 2, 2, 3, 5, 6]));
function findSubstring(haystack, needle) {
  return haystack.indexOf(needle);
}

const haystack = 'hunglamessi';
const needle = 'messi';
// console.log(findSubstring(haystack, needle));

const searchInsertPosition = (arr, target) => {
  const findIndex = arr.findIndex((num) => num >= target);

  return findIndex === -1 ? arr.length : findIndex;
};
// console.log(searchInsertPosition([1, 3, 5, 6], 2));

const removeElement = (arr, val) => {
  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== val) {
      arr[k] = arr[i];
      k++;
    }
  }
  return k;
};
// console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));

const lengthOfLastWord = (s) => {
  s = s.trim();
  const arrWords = s.split(' ');
  const lastWord = arrWords[arrWords.length - 1];
  const lengthLast = lastWord.length;

  return lengthLast;
};
lengthOfLastWord('   fly me   to   the moon  ');

function plusOne(digits) {
  let carry = 1;

  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i] += carry;
    carry = Math.floor(digits[i] / 10);
    digits[i] %= 10;
  }
  if (carry) {
    digits.unshift(carry);
  }
  return digits;
}

const addBinary = (a, b) => {
  const sum = parseInt(a, 2) + parseInt(b, 2);

  return sum.toString(2);
};

const sqrt = (x) => {
  return Math.floor(Math.sqrt(x));
};
// console.log(addBinary('11', '1'));
// console.log(plusOne([9, 9, 8]));
// console.log(sqrt(8));

const mergeTwoLists = (l1, l2) => {
  const mainNode = new ListNode(0);
  let current = mainNode;

  while (l1 !== null && l2 !== null) {
    if (l1.data < l2.data) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  if (l1 !== null) {
    current.next = l1;
  }
  if (l2 !== null) {
    current.next = l2;
  }
  return mainNode.next;
};

const deleteDuplicates = (head) => {
  let current = head;

  while (current && current.next) {
    if (current.data === current.next.data) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(4);
list1.next.next.next = new ListNode(4);
const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);
// console.log(mergeTwoLists(list1, list2));
// console.log(deleteDuplicates(list1));

const Oop1Page = () => {
  return <div>oop1</div>;
};

export default Oop1Page;
