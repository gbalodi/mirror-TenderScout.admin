import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-group-tree',
  templateUrl: './group-tree.component.html',
  styleUrls: ['./group-tree.component.scss']
})
export class GroupTreeComponent implements OnInit {

  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1.1' },
        { name: 'child1.2' },
        { name: 'child1.3' },
        { name: 'child1.4' },
        { name: 'child1.5' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1' },
        { name: 'child2.2' },
        { name: 'child2.3' },
        { name: 'child2.4' },
        {
          name: 'child2.5'
        }
      ]
    }
  ];

  options = {
    allowDrag: true,
    allowDrop(element, to) {
      const isSameParent = element.parent.id === to.parent.id;
      if (_.find(element.parent.data.children, ['name', to.parent.data.name]))
        return false;
      return true;
    }
  };

  constructor() { }

  ngOnInit() {
  }

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.name,
      "to",
      $event.to.parent.name,
      "at index",
      $event.to.index);
  }

  onDrop($event) {
    // Dropped $event.element
    console.log(event);
  }

  allowDrop(element) {
    // Return true/false based on element
    console.log(element);
  }

}
