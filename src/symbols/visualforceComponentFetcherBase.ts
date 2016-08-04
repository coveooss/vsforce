import {IVisualforceComponentFetcher} from './visualforceComponentFetcher'
import {VisualforceBaseComponent} from './visualforceBaseComponents'

export class VisualforceComponentFetcherBase implements IVisualforceComponentFetcher {
  public canOverwrite: boolean = true;

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

  public dispose() { }
}
