import {IVisualforceComponentFetcher} from './visualforceComponentFetcher';
import {VisualforceBaseComponent} from './visualforceBaseComponents';

/**
 * Visualforce Component Fetcher Base class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherBase implements IVisualforceComponentFetcher {
  // TODO: give a description
  public canOverwrite: boolean = true;

  /**
   * TODO: give a description
   *
   * @return {Thenable<IVisualforceComponent[]>} TODO: give a description
   */
  public fetchAll(): Thenable<IVisualforceComponent[]> {
    return new Promise<IVisualforceComponent[]>((resolve, reject) => {
      var componentList: IVisualforceComponent[] = [];

      for (var cmp in VisualforceBaseComponent) {
        var attributes: IVisualforceComponentAttribute[] = [];

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
