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
    if (!this.root) {
      return 0;
    }

    function calculateMinDepth(node) {
      if (!node) { return 0; }
      if (!node.left && !node.right) { return 1; }
      if (!node.left) { return 1 + calculateMinDepth(node.right); }
      if (!node.right) { return 1 + calculateMinDepth(node.left); }
      return (1 + Math.min(calculateMinDepth(node.left), calculateMinDepth(node.right)));

    }
    return calculateMinDepth(this.root);
  }


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    }

    function calculateMaxDepth(node) {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      if (!node.left) return 1 + calculateMaxDepth(node.right);
      if (!node.right) return 1 + calculateMaxDepth(node.left);
      return (1 + Math.max(calculateMaxDepth(node.left), calculateMaxDepth(node.right)));

    }
    return calculateMaxDepth(this.root);
  }


  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSumValue = 0;

    function calculateMaxSum(node) {
      if (!node) return 0;
      const leftSum = calculateMaxSum(node.left);
      const rightSum = calculateMaxSum(node.right);
      maxSumValue = Math.max(maxSumValue, leftSum + rightSum + node.val);
      return Math.max(0, leftSum, rightSum) + node.val;
    }

    calculateMaxSum(this.root);

    return maxSumValue;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }
    let result = null;

    function findNextLarger(node) {
      if (!node) {
        return;
      }

      if (node.val > lowerBound) {
        if (!result || node.val < result) {
          result = node.val;
        }
      }

      if (node.val > lowerBound) {
        findNextLarger(node.left);
      }

      findNextLarger(node.right);
    }
    findNextLarger(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    function getNodeDepthAndParent(root, target, depth = 0, parent = null) {
      if (!root) {
        return null;
      }
  
      if (root === target) {
        return { depth, parent };
      }
  
      const leftResult = getNodeDepthAndParent(root.left, target, depth + 1, root);
      const rightResult = getNodeDepthAndParent(root.right, target, depth + 1, root);
  
      return leftResult || rightResult;
    }
  
    const node1Info = getNodeDepthAndParent(this.root, node1);
    const node2Info = getNodeDepthAndParent(this.root, node2);
  
    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if(!tree || !tree.root) {
      return "";
    }
     function serializeNode(node) {
      if (!node) {
        return "null";
      }

      const left = serializeNode(node.left);
      const right = serializeNode(node.right);

      return `${node.val},${left},${right}`;
     }
     return serializeNode(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if(!stringTree) {
      return null;
    }

    const values = stringTree.split(",");

    function deserializeNode() {
      const val = values.shift();

      if( val === "null") {
        return null;
      }

      const node = new BinaryTreeNode(parseInt(val));
      node.left = deserializeNode();
      node.right= deserializeNode();

      return node;
    }
    const root = deserializeNode();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLCA(root, p, q) {
      if(!root || root === p || root === q) {
        return root;
      }

      const left = findLCA(root.left, p, q);
      const right = findLCA(root.right, p,q);

      if (left && right) {
        return root;
      }

      return left || right;
    }

    return findLCA(this.root, node1, node2)
  }
}


module.exports = { BinaryTree, BinaryTreeNode };
