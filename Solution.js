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