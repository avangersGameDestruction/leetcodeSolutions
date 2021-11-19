// 19. Remove Nth Node From End of List
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let first = head;
    let second = head;
    let count = 0;
    while (count < n) {
        second = second.next;
        count++;
    }
    if (!second) {
        head = head.next;
    } else {
        while (second.next) {
            first = first.next;
            second = second.next;
        }
        first.next = first.next.next;
    }
    return head;
};

// 4. Median of Two Sorted Arrays
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = nums1.concat(nums2);
    arr.sort((a, b) => a - b);
    if (arr.length % 2 !== 0) {
        return arr[Math.floor(arr.length / 2)];
    } else {
        return (arr[(arr.length / 2) - 1] + arr[(arr.length / 2)]) / 2;
    }
};

// reverse-nodes-in-k-group
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let stack = [];
    let newNode = new ListNode(-1);
    let temp = newNode;

    while (head) {
        for (let i = 0; i < k && head; i++) {
            stack.push(head);
            head = head.next;
        }

        if (stack.length === k) {
            while (stack.length > 0) {
                temp.next = stack.pop();
                temp = temp.next;
            }
            temp.next = head;
        }
    }
    return newNode.next;
};

// sudoku solver
var solveSudoku = function(board) {
    function sudokuSolver(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    let char = '1';
                    while (char <= 9) {
                        if (isValidSudoku(i, j, char)) {
                            board[i][j] = char;

                            if (sudokuSolver(board)) return true;
                            else board[i][j] = '.';
                        }
                        char = (parseInt(char) + 1).toString();
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function isValidSudoku(row, col, char) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === char) return false;
        }

        for (let i = 0; i < 9; i++) {
            if (board[i][col] === char) return false;
        }

        let x = Math.floor(row / 3) * 3;
        let y = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[x + i][y + j] === char) return false;
            }
        }
        return true;
    }
    sudokuSolver(board);
};