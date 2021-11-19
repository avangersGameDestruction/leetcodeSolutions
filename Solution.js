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

// unique paths III
const TILE_OBSTACLE = -1;
const TILE_STARTING = 1;
const TILE_ENDING = 2;
const TILE_FREE = 0;

function Position(x, y) {
    this.x = x;
    this.y = y;
}

// hash function to store hashed positions in a Set
Position.prototype.hash = function() { return this.y * 100 + this.x; };

function UniquePathsResolver(grid) {
    this.grid = grid;
    this.gridWidth = grid[0].length;
    this.gridHeight = grid.length;
    this.walkableStepsCount = 0;

    // stores the list of positions taken in our current path
    this.steps = [];
    // stores the hashes of the steps taken
    // this will let us check in constant time if we have already gone through that position
    this.stepsVisited = new Set();

    // scan our map to count walkable tiles, find start and end position.
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (TILE_STARTING === grid[y][x]) {
                this.startingPos = new Position(x, y);
            } else if (TILE_ENDING === grid[y][x]) {
                this.endingPos = new Position(x, y);
            }

            if (TILE_OBSTACLE !== grid[y][x]) {
                this.walkableStepsCount++;
            }
        }
    }
}

UniquePathsResolver.prototype.pushStep = function(stepPos) {
    this.steps.push(stepPos);
    this.stepsVisited.add(stepPos.hash());
}

UniquePathsResolver.prototype.popStep = function() {
    const stepPos = this.steps.pop();
    this.stepsVisited.delete(stepPos.hash());
    return stepPos;
}

UniquePathsResolver.prototype.isPositionTaken = function(pos) {
    return this.stepsVisited.has(pos.hash());
}

UniquePathsResolver.prototype.isPositionInBounds = function(pos) {
    return true &&
        pos.x >= 0 &&
        pos.x < this.gridWidth &&
        pos.y >= 0 &&
        pos.y < this.gridHeight;
}

UniquePathsResolver.prototype.isPositionBlocked = function(pos) {
    return this.grid[pos.y][pos.x] === TILE_OBSTACLE;
}

UniquePathsResolver.prototype.canTakeStep = function(pos) {
    return this.isPositionInBounds(pos) &&
        !this.isPositionBlocked(pos) &&
        !this.isPositionTaken(pos);
}

UniquePathsResolver.prototype.getCurrentStep = function() {
    return this.steps[this.steps.length - 1];
}

UniquePathsResolver.prototype.getAdjacentPositions = function(pos) {
    const posNorth = new Position(pos.x, pos.y - 1);
    const poseSouth = new Position(pos.x, pos.y + 1);
    const posWest = new Position(pos.x - 1, pos.y);
    const posEast = new Position(pos.x + 1, pos.y);

    return [posNorth, poseSouth, posWest, posEast]
        .filter((pos) => this.canTakeStep(pos));
}

UniquePathsResolver.prototype.resolve = function() {
    const findPaths = (paths) => {
        const currentPos = this.getCurrentStep();

        const reachedEndingPos = currentPos.hash() === this.endingPos.hash();
        if (reachedEndingPos) {
            const isSolution = this.steps.length === this.walkableStepsCount;
            if (isSolution) { paths.push([...this.steps]); }
            return;
        }

        const allowedNextPositions = this.getAdjacentPositions(currentPos);
        for (const pos of allowedNextPositions) {
            this.pushStep(pos);
            findPaths(paths);
            this.popStep();
        }
    }

    this.steps = [];
    this.stepsVisited.clear();
    this.pushStep(this.startingPos);

    const paths = [];
    findPaths(paths);
    return paths;
}

var uniquePathsIII = function(grid) {
    const resolver = new UniquePathsResolver(grid);
    const paths = resolver.resolve();
    return paths.length;
};