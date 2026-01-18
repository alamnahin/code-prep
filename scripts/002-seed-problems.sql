-- Seed some initial coding problems
-- Using dollar-quoted strings for multi-line content to avoid escaping issues

INSERT INTO problems (title, slug, description, difficulty, starter_code, test_cases) VALUES
(
  'Two Sum',
  'two-sum',
  $$## Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example 1:
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2:
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.$$,
  'easy',
  $$function twoSum(nums, target) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"nums": [2, 7, 11, 15], "target": 9},
      "expected": [0, 1]
    },
    {
      "input": {"nums": [3, 2, 4], "target": 6},
      "expected": [1, 2]
    },
    {
      "input": {"nums": [3, 3], "target": 6},
      "expected": [0, 1]
    }
  ]$$
),
(
  'Reverse String',
  'reverse-string',
  $$## Reverse String

Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array in-place with O(1) extra memory.

### Example 1:
```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

### Example 2:
```
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```

### Constraints:
- 1 <= s.length <= 10^5
- s[i] is a printable ascii character.$$,
  'easy',
  $$function reverseString(s) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"s": ["h","e","l","l","o"]},
      "expected": ["o","l","l","e","h"]
    },
    {
      "input": {"s": ["H","a","n","n","a","h"]},
      "expected": ["h","a","n","n","a","H"]
    }
  ]$$
),
(
  'Valid Palindrome',
  'valid-palindrome',
  $$## Valid Palindrome

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

### Example 1:
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2:
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Constraints:
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters.$$,
  'easy',
  $$function isPalindrome(s) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"s": "A man, a plan, a canal: Panama"},
      "expected": true
    },
    {
      "input": {"s": "race a car"},
      "expected": false
    },
    {
      "input": {"s": " "},
      "expected": true
    }
  ]$$
),
(
  'Fizz Buzz',
  'fizz-buzz',
  $$## Fizz Buzz

Given an integer `n`, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

### Example 1:
```
Input: n = 3
Output: ["1","2","Fizz"]
```

### Example 2:
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

### Example 3:
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

### Constraints:
- 1 <= n <= 10^4$$,
  'easy',
  $$function fizzBuzz(n) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"n": 3},
      "expected": ["1","2","Fizz"]
    },
    {
      "input": {"n": 5},
      "expected": ["1","2","Fizz","4","Buzz"]
    },
    {
      "input": {"n": 15},
      "expected": ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
    }
  ]$$
),
(
  'Maximum Subarray',
  'maximum-subarray',
  $$## Maximum Subarray

Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

### Example 1:
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

### Example 2:
```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

### Example 3:
```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

### Constraints:
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4$$,
  'medium',
  $$function maxSubArray(nums) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"nums": [-2,1,-3,4,-1,2,1,-5,4]},
      "expected": 6
    },
    {
      "input": {"nums": [1]},
      "expected": 1
    },
    {
      "input": {"nums": [5,4,-1,7,8]},
      "expected": 23
    }
  ]$$
),
(
  'Contains Duplicate',
  'contains-duplicate',
  $$## Contains Duplicate

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

### Example 1:
```
Input: nums = [1,2,3,1]
Output: true
```

### Example 2:
```
Input: nums = [1,2,3,4]
Output: false
```

### Example 3:
```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

### Constraints:
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9$$,
  'easy',
  $$function containsDuplicate(nums) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"nums": [1,2,3,1]},
      "expected": true
    },
    {
      "input": {"nums": [1,2,3,4]},
      "expected": false
    },
    {
      "input": {"nums": [1,1,1,3,3,4,3,2,4,2]},
      "expected": true
    }
  ]$$
),
(
  'Merge Two Sorted Lists',
  'merge-two-sorted-lists',
  $$## Merge Two Sorted Lists

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Example 1:
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

### Example 2:
```
Input: list1 = [], list2 = []
Output: []
```

### Example 3:
```
Input: list1 = [], list2 = [0]
Output: [0]
```

### Constraints:
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.$$,
  'easy',
  $$function mergeTwoLists(list1, list2) {
  // For simplicity, working with arrays instead of linked list nodes
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"list1": [1,2,4], "list2": [1,3,4]},
      "expected": [1,1,2,3,4,4]
    },
    {
      "input": {"list1": [], "list2": []},
      "expected": []
    },
    {
      "input": {"list1": [], "list2": [0]},
      "expected": [0]
    }
  ]$$
),
(
  'Valid Anagram',
  'valid-anagram',
  $$## Valid Anagram

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
```
Input: s = "anagram", t = "nagaram"
Output: true
```

### Example 2:
```
Input: s = "rat", t = "car"
Output: false
```

### Constraints:
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.$$,
  'easy',
  $$function isAnagram(s, t) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"s": "anagram", "t": "nagaram"},
      "expected": true
    },
    {
      "input": {"s": "rat", "t": "car"},
      "expected": false
    }
  ]$$
),
(
  'Best Time to Buy and Sell Stock',
  'best-time-to-buy-and-sell-stock',
  $$## Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

### Example 1:
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
```

### Example 2:
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

### Constraints:
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4$$,
  'easy',
  $$function maxProfit(prices) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"prices": [7,1,5,3,6,4]},
      "expected": 5
    },
    {
      "input": {"prices": [7,6,4,3,1]},
      "expected": 0
    }
  ]$$
),
(
  'Valid Parentheses',
  'valid-parentheses',
  $$## Valid Parentheses

Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
```
Input: s = "()"
Output: true
```

### Example 2:
```
Input: s = "()[]{}"
Output: true
```

### Example 3:
```
Input: s = "(]"
Output: false
```

### Constraints:
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.$$,
  'easy',
  $$function isValid(s) {
  // Write your code here
  
}$$,
  $$[
    {
      "input": {"s": "()"},
      "expected": true
    },
    {
      "input": {"s": "()[]{}"},
      "expected": true
    },
    {
      "input": {"s": "(]"},
      "expected": false
    },
    {
      "input": {"s": "([)]"},
      "expected": false
    }
  ]$$
);
