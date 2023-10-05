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

	// buildTree function ingests an unsorted array, then:
	//  1) Deletes dupes
	//  2) Sorts the array
	//  3) Returns a balanced binary search tree starting from the level-0 root node.
	buildTree = (values) => {
		if (values?.length === 0) return null;
		const sorted = values.sort((a, b) => a - b);
		const middle = Math.floor(sorted.length / 2);
		const leftBranch = values.slice(0, middle);
		const rightBranch = values.slice(middle + 1, values.length);
		console.log(middle, leftBranch, rightBranch);

		return new Node(
			values[middle],
			this.buildTree(leftBranch),
			this.buildTree(rightBranch)
		);
	};

	// Optionally add a prettyPrint function, provided by TOP to visually the tree in the console.
	prettyPrint = (node, prefix = '', isLeft = true) => {
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
	};

	// Insert method that inserts a value at the correct position.
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

	// Delete method that finds a node and deletes it, moving childen appropriately.

	// Find method that accepts a value as a parameter then returns the node with the given value or null if not found.

	// Level order method that takes a function as a parameter and goes over the tree in level-order passing the value of each node as an argument to the parameter function. Use an Array as a queue.

	//Inorder, preorder, and postorder methods that accept a function
}
