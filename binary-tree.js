/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    let queue = [{ node: this.root, depth: 1 }];

    while (queue.length > 0) {
      let { node, depth } = queue.shift();

      // Check if it's a leaf node
      if (!node.left && !node.right) {
        return depth;
      }

      // Add children to the queue with incremented depth
      if (node.left) queue.push({ node: node.left, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function traverse(node) {
      if (!node) return 0;
      let leftDepth = traverse(node.left);
      let rightDepth = traverse(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    }

    return traverse(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = -Infinity;

    function traverse(node) {
      if (!node) return 0;

      // Calculate the maximum path sum for the left and right subtrees
      let leftSum = Math.max(traverse(node.left), 0);
      let rightSum = Math.max(traverse(node.right), 0);

      // Calculate the maximum path sum including the current node
      let currentSum = node.val + leftSum + rightSum;

      // Update the global maximum path sum
      maxSum = Math.max(maxSum, currentSum);

      // Return the maximum path sum including the current node and one of its subtrees
      return node.val + Math.max(leftSum, rightSum);
    }

    traverse(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let nextLargerValue = null;

    function traverse(node) {
      if (!node) return;

      if (node.val > lowerBound && (nextLargerValue === null || node.val < nextLargerValue)) {
        nextLargerValue = node.val;
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return nextLargerValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;

    let queue = [{ node: this.root, parent: null }];

    while (queue.length > 0) {
      let levelSize = queue.length;
      let foundNode1 = null;
      let foundNode2 = null;

      for (let i = 0; i < levelSize; i++) {
        let { node, parent } = queue.shift();

        if (node === node1) foundNode1 = parent;
        if (node === node2) foundNode2 = parent;

        if (node.left) queue.push({ node: node.left, parent: node });
        if (node.right) queue.push({ node: node.right, parent: node });
      }

      if (foundNode1 && foundNode2) return foundNode1 !== foundNode2;
      if (foundNode1 || foundNode2) return false;
    }

    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function traverse(node) {
      if (!node) return '#';
      return `${node.val},${traverse(node.left)},${traverse(node.right)}`;
    }

    return traverse(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    const values = stringTree.split(',');

    function traverse() {
      const value = values.shift();
      if (value === '#') return null;
      const node = new BinaryTreeNode(parseInt(value));
      node.left = traverse();
      node.right = traverse();
      return node;
    }

    return new BinaryTree(traverse());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLCA(node, node1, node2) {
      if (!node) return null;

      if (node === node1 || node === node2) return node;

      const leftLCA = findLCA(node.left, node1, node2);
      const rightLCA = findLCA(node.right, node1, node2);

      if (leftLCA && rightLCA) return node;

      return leftLCA ? leftLCA : rightLCA;
    }

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
