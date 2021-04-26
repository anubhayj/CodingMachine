
/**
 * Fun fact Memoisation : Makes code run faster
 * Memoisation helps in saving call stacks as the visited nodes need not be visited again.
 */
var longestIncreasingPath = function (matrix) {
    if (matrix == null || !matrix.length || !matrix[0].length) return 0;

    const row = matrix.length;
    const col = matrix[0].length;
    const dp = new Array(row);
    for (let i = 0; i < row; ++i) {
        dp[i] = new Array(col);
    }

    /**
     * Pity interesting this is actually slower than normal for loop , so much for maps.
     * So !!!! lets loop.
     */
    // let dp = new Array(matrix.length).fill([]).map(() => new Array(matrix[0].length).fill(undefined))

    let res = 0;
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            res = Math.max(res, helper(matrix, dp, -1, i, j));
        }
    }

    return res;
};

function helper(matrix, dp, prev, row, col) {

    /**
     * Catch is the base condition
     */
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
        return 0;
    }
    let curr = matrix[row][col];

    if (curr <= prev) return 0;

    if (dp[row][col]) {
        return dp[row][col];
    }

    /**
     * For any given co-ordinates our cursor can move in eiher of four direction.
     */
    let bottom = helper(matrix, dp, curr, row + 1, col);
    let top = helper(matrix, dp, curr, row - 1, col);
    let right = helper(matrix, dp, curr, row, col + 1);
    let left = helper(matrix, dp, curr, row, col - 1);

    // This is max of the all plus the current node.
    let max = 1 + Math.max(bottom, top, left, right)

    dp[row][col] = max;

    return max;
}


console.log(longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]))

//expected --> 4
console.log(longestIncreasingPath([[7, 7, 5], [2, 4, 6], [8, 2, 0]]))

console.log(longestIncreasingPath([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [19, 18, 17, 16, 15, 14, 13, 12, 11, 10], [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [39, 38, 37, 36, 35, 34, 33, 32, 31, 30], [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [59, 58, 57, 56, 55, 54, 53, 52, 51, 50], [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], [79, 78, 77, 76, 75, 74, 73, 72, 71, 70], [80, 81, 82, 83, 84, 85, 86, 87, 88, 89], [99, 98, 97, 96, 95, 94, 93, 92, 91, 90], [100, 101, 102, 103, 104, 105, 106, 107, 108, 109], [119, 118, 117, 116, 115, 114, 113, 112, 111, 110], [120, 121, 122, 123, 124, 125, 126, 127, 128, 129], [139, 138, 137, 136, 135, 134, 133, 132, 131, 130], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]))