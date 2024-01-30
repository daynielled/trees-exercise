/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if(!this.root) {
      return 0;
    }

    function calculateSum(node) {
      let sum = node.val;

      for (const child of node.children) {
        sum += calculateSum(child);
      }

      return sum;
    }

    return calculateSum(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if(!this.root) {
      return 0;
    }

    let count = this.root.val % 2 === 0 ? 1 : 0;

    function countEvensHelper(node) {
      for (const child of node.children) {
        if(child.val % 2 === 0) {
          count ++;
        }
        countEvensHelper(child);
      }
    }
    countEvensHelper(this.root);

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if(!this.root) {
      return 0;
    }

    let count = this.root.val > lowerBound ? 1 : 0;

    function countGreaterHelper(node) {
      for ( const child of node.children) {
        if(child.val > lowerBound) {
          count ++;
        }

        countGreaterHelper(child);
      }
    }

    countGreaterHelper(this.root);

    return count;
  }
}

module.exports = { Tree, TreeNode };
