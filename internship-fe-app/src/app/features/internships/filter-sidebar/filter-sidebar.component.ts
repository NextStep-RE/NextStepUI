import { Component, EventEmitter, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree'; 

interface FilterNode {
  name: string;
  selected?: boolean;
  children?: FilterNode[];
}

interface FilterNodeFlat {
  name: string;
  level: number;
  expandable: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
})
export class FilterSidebarComponent {
  @Output() filterChanged = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<string>();

  filters = {
    remote: false,
    fullTime: false,
    location: '',
    experience: '',
    commonRequirements: '',
    experienceRange: 0,
    company: '',
    onSite: false
  };

  filterData: FilterNode[] = [
    {
      name: 'Category',
      children: [
        { name: 'Engineering' },
        { name: 'Design' },
        { name: 'Marketing' },
      ],
    },
    {
      name: 'Location',
      children: [
        { name: 'Cluj-Napoca' },
        { name: 'Bucharest' },
        { name: 'Timisoara' },
      ],
    },
  ];

  private _transformer = (node: FilterNode, level: number): FilterNodeFlat => ({
    name: node.name,
    level,
    expandable: !!node.children && node.children.length > 0,
    selected: node.selected || false,
  });

  // FlatTreeControl to manage the expanded/collapsed states of the tree
  treeControl = new FlatTreeControl<FilterNodeFlat>(
    (node) => node.level,
    (node) => node.expandable
  );

  // MatTreeFlattener to flatten the hierarchical data
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children || []
  );

  // DataSource for the tree (FlatDataSource)
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FilterNodeFlat) => node.expandable;

  sortBy: string = 'name';

  commonRequirements = ['HTML', 'CSS', 'JavaScript', 'React', 'Python'];
  companies = [
    { id: '1', name: 'Company A' },
    { id: '2', name: 'Company B' },
    { id: '3', name: 'Company C' },
    { id: '4', name: 'Company D' }
  ];

  // Handler for filter changes (Checkboxes and Inputs)
  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  // Handler for sort changes
  onSortChange(sortBy: string) {
    this.sortChanged.emit(sortBy);
  }
}
