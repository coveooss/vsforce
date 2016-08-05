import {VisualforceComponentFetcher} from './visualforceComponentFetcher';
import {VisualforceBaseComponent} from './visualforceBaseComponents';

/**
 * Visualforce Component Fetcher Base class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherBase implements VisualforceComponentFetcher {
  // TODO: give a description
  public canOverwrite: boolean = true;

  /**
   * TODO: give a description
   * 
   * @return {Thenable<VisualforceComponent[]>} TODO: give a description
   */
  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];

      for (var cmp in VisualforceBaseComponent) {
        var attributes: VisualforceComponentAttribute[] = [];

        for (var attr in VisualforceBaseComponent[cmp].attribs) {
          attributes.push({
            name: attr,
            type: VisualforceBaseComponent[cmp].attribs[attr].type,
            description: ''
          });
        }

        componentList.push({
          name: cmp,
          attributes: attributes
        });
      }

      resolve(componentList);
    });
  }

  /**
   * TODO: give a description
   */
  public dispose() { }
}
