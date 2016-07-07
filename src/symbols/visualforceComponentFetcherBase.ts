import {VisualforceComponentFetcher} from './visualforceComponentFetcher'
import {VisualforceBaseComponent} from './visualforceBaseComponents'

export class VisualforceComponentFetcherBase implements VisualforceComponentFetcher {
  public canOverwrite:boolean = true;

  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];

      for (var cmp in VisualforceBaseComponent) {
        var attributes: VisualforceComponentAttribute[] = [];

        for (var attr in VisualforceBaseComponent[cmp].attribs) {
          attributes.push({
            name: attr,
            type: VisualforceBaseComponent[cmp].attribs[attr].type,
            values: VisualforceBaseComponent[cmp].attribs[attr].values
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
}
