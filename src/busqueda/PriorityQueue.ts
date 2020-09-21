import {node} from './index';

class PriorityQueue {

  items: node[];

  constructor() {
    this.items = [];
  }

  enqueue(element: node) : void {
    let contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].cost > element.cost) {
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(element);
    }
  }

  dequeue() : node {
    let shiftNode = this.items.shift();
    return shiftNode
  }

  isEmpty() : boolean {
    return this.items.length == 0;
  }

  printQueue(): void {
    console.log('Priority Queue')
    for(let node of this.items){
      console.log(`${node.pos[0]},${node.pos[1]} : ${node.cost}`)
    }
  }

}

export default PriorityQueue;
