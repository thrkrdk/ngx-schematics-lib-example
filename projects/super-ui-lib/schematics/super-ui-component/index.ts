import { Rule,  apply,  applyTemplates,  chain,  mergeWith,  move, url } from '@angular-devkit/schematics';
import {strings, normalize} from '@angular-devkit/core'
import { SuperUIComponentSchema } from './super-component';

export function superUIComponent(options: SuperUIComponentSchema): Rule {
  return () => {
    const  templateSource = apply(
        url('./files'), [
            applyTemplates({
                classify: strings.classify,  // buisimler tempalteden geldi.
                dasherize: strings.dasherize,
                name:options.name
            }),
            move(normalize(`/${options.path}/${strings.dasherize(options.name)}`))
        ]
    ) 

    return chain([
        mergeWith(templateSource)
    ]);
  };
}
