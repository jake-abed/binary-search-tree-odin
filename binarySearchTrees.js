'use strict';

//Node class with value, left, and right.

class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

//Tree class that creates binary search trees.

class Tree {
	constructor(values) {
		this.root = this.buildTree(values);
	}

	buildTree(values) {
		if (values?.length === 0) return null;
		const sorted = values.sort((a, b) => a - b);
		const middle = Math.floor(sorted.length / 2);
		const leftBranch = values.slice(0, middle);
		const rightBranch = values.slice(middle + 1, values.length);

		return new Node(
			values[middle],
			this.buildTree(leftBranch),
			this.buildTree(rightBranch)
		);
	}

	// prettyPrint function provided by Odin, but modified slightly.
	prettyPrint(node = this.root, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? '    ' : '│   '}`,
				true
			);
		}
	}

	insert(value, node = this.root) {
		if (value === node.data)
			return console.log(`${value} is already in the tree.`);
		if (value < node.data && node.left === null)
			return (node.left = new Node(value));
		if (value > node.data && node.right === null)
			return (node.right = new Node(value));
		if (value < node.data) return this.insert(value, node.left);
		else return this.insert(value, node.right);
	}

	delete(value, node = this.root, prevNode = null, isLeft = null) {
		if (value != node.data && !node.left && !node.right) return null;
		if (value < node.data) return this.delete(value, node.left, node, true);
		if (value > node.data)
			return this.delete(value, node.right, node, false);
		if (value === node.data && node.right === null && isLeft)
			return (prevNode.left = node.left);
		if (
			value === node.data &&
			node.right === null &&
			node.left === null &&
			!isLeft
		)
			return (prevNode.right = null);
		if (value === node.data && !node.left)
			if (value === node.data) {
				return (node.data = findSuccessor(node.right, node));
			}

		function findSuccessor(node, nodeToBeDeleted) {
			let successor, previous;
			let leftFound = false;
			while (!successor) {
				if (node.left) {
					leftFound = true;
					previous = node;
					node = node.left;
				} else {
					successor = node.data;
					if (leftFound) {
						previous.left = node.right;
					} else {
						previous = nodeToBeDeleted;
						previous.right = node.right;
					}
				}
			}
			return successor;
		}
	}

	find(value) {
		let current = this.root;
		let found = false;
		if (value === current.data) return current;
		while (!found) {
			if (current.data === value) {
				found = true;
				break;
			}
			if (!current.left && !current.right) break;
			if (current.data > value && current.left) current = current.left;
			if (current.data < value && current.right) current = current.right;
			if (
				(current.data > value && !current.left) ||
				(current.data < value && !current.right)
			)
				break;
		}
		return found ? current : null;
	}

	levelOrder(callback) {
		let queue = [this.root];
		let nextQueue = [];
		while (queue.length > 0 || nextQueue.length > 0) {
			if (queue.length > 0) {
				let current = queue.shift();
				callback(current.data);
				if (current.left !== null) nextQueue.push(current.left);
				if (current.right !== null) nextQueue.push(current.right);
			}
			if (queue.length === 0) {
				queue = nextQueue;
				nextQueue = [];
			}
		}
	}

	inorder(callback, node = this.root) {
		if (node.left === null && node.right === null) {
			callback(node.data);
			return;
		}
		if (node.left !== null) this.inorder(callback, node.left);
		callback(node.data);
		if (node.right !== null) this.inorder(callback, node.right);
	}

	preorder(callback, node = this.root) {
		if (node.left === null && node.right === null) {
			callback(node.data);
			return;
		}
		callback(node.data);
		if (node.left !== null) this.preorder(callback, node.left);
		if (node.right !== null) this.preorder(callback, node.right);
	}

	postorder(callback, node = this.root) {
		if (node.left === null && node.right === null) {
			callback(node.data);
			return;
		}
		if (node.left !== null) this.postorder(callback, node.left);
		if (node.right !== null) this.postorder(callback, node.right);
		callback(node.data);
	}

	// Height function accepts a node and returns it's height.

	height(node = this.root) {
		let height = 1;
		let heights = new Map();
		heights.set(height, height);
		function descendNodes(node, heightSoFar) {
			heightSoFar++;
			if (!heights.has(heightSoFar))
				heights.set(heightSoFar, heightSoFar);
			if (node.left) descendNodes(node.left, heightSoFar);
			if (node.right) descendNodes(node.right, heightSoFar);
			return;
		}
		if (node.left) descendNodes(node.left, height);
		if (node.right) descendNodes(node.right, height);
		return Array.from(heights.keys()).sort((a, b) => b - a)[0];
	}

	// Depth function that returns how far in from the root the node is.
	depth(node) {
		let currentDepth = 0;
		let currentNode = this.root;
		while (currentNode !== node) {
			console.log(currentNode);
			currentDepth++;
			node.data < currentNode.data
				? (currentNode = currentNode.left)
				: (currentNode = currentNode.right);
		}
		return ++currentDepth;
	}

	isBalanced() {
		let height = 1;
		let heights = new Map();
		function mapBottomNodes(node, heightSoFar) {
			heightSoFar++;
			if (!node.left && !node.right) {
				return heights.set(heightSoFar, heightSoFar);
			}
			if (node.left) mapBottomNodes(node.left, heightSoFar);
			if (node.right) mapBottomNodes(node.right, heightSoFar);
			return;
		}
		mapBottomNodes(this.root, height);
		const sortedDepths = Array.from(heights.keys()).sort((a, b) => b - a);
		return sortedDepths[0] - sortedDepths[sortedDepths.length - 1] <= 1;
	}
}

export { Tree };
