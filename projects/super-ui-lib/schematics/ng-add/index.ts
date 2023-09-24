import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
  UpdateRecorder,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import {
  NodeDependency,
  NodeDependencyType,
  getPackageJsonDependency,
  addPackageJsonDependency,
  removePackageJsonDependency,
} from '@schematics/angular/utility/dependencies';

import * as ts from 'typescript';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    context.logger.info('Installing Dependencies');
    const dep: NodeDependency = {
      type: NodeDependencyType.Dev,
      name: 'moment',
      version: '~2.27.0',
      overwrite: true,
    };

    addPackageJsonDependency(tree, dep);
    console.log(getPackageJsonDependency(tree, 'moment'));
    // { type: 'devDependencies', name: 'moment', version: '~2.27.0' }

    removePackageJsonDependency(tree, 'protractor');
    console.log(getPackageJsonDependency(tree, 'protractor'));
    

    //modifying app module

    const modulePath = '/src/app/app.module.ts';
    if (!tree.exists(modulePath)) {
      throw new SchematicsException(`The file ${modulePath} is not found`);
    }

    const recorder: UpdateRecorder = tree.beginUpdate(modulePath); 
    const text = tree.read(modulePath); 
    if (text === null) {
      throw new SchematicsException(`The file ${modulePath} is empty`);
    }
  

    context.logger.info('dfddd3');
    const source = ts.createSourceFile(
      modulePath,
      text.toString(),
      ts.ScriptTarget.ESNext,
      true
    );

    context.logger.info('dfddd4');
    applyToUpdateRecorder(
      recorder,
      addImportToModule(source, modulePath, 'SuperUiLibModule', 'super-ui-lib')
    );

    tree.commitUpdate(recorder);

    context.addTask(new NodePackageInstallTask(), []);

    return tree;
  };
}
