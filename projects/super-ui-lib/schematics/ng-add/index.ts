import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    NodeDependency,
    NodeDependencyType,
    getPackageJsonDependency,
    addPackageJsonDependency,
    removePackageJsonDependency,
  } from '@schematics/angular/utility/dependencies';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    context.logger.info('Installing Dependencies')
    const dep: NodeDependency = {
        type: NodeDependencyType.Dev,
        name: 'moment',
        version: '~2.27.0',
        overwrite: true,
      };
  
      addPackageJsonDependency(tree, dep);
      console.log(getPackageJsonDependency(tree, 'moment'))
      // { type: 'devDependencies', name: 'moment', version: '~2.27.0' }
  
      removePackageJsonDependency(tree, 'protractor');
      console.log(getPackageJsonDependency(tree, 'protractor'))
      // null
  

      context.addTask(new NodePackageInstallTask(), []);

    return tree
  };
}
