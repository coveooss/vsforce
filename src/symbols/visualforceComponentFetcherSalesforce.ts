import {IVisualforceComponentFetcher} from './visualforceComponentFetcher'
import {Connection, IQueryResult} from './../connection'

interface IApexComponentQueryResult {
  Description: string;
  Name: string;
  NamespacePrefix?: string;
}

export class VisualforceComponentFetcherSalesforce implements IVisualforceComponentFetcher {
  private conn: Connection = new Connection();

  public canOverwrite: boolean = false;

  public fetchAll(): Thenable<IVisualforceComponent[]> {
    return new Promise<IVisualforceComponent[]>((resolve, reject) => {
      var componentList: IVisualforceComponent[] = [];
      this.conn.executeQuery('SELECT Description, Name, NamespacePrefix FROM ApexComponent').then((results: IQueryResult) => {
        if (results && results.totalSize != 0) {
          for (var record in results.records) {
            componentList.push({
              name: this.buildFullNameFromResult(results.records[record]),
              uri: this.buildUriFromResult(results.records[record]),
              attributes: []
            });
          }

          resolve(componentList);
        }
      });
    });
  }

  private buildUriFromResult(result: IApexComponentQueryResult): string {
    return `sf://salesforce.com/apexcomponent/${this.buildNamespaceFromResult(result)}/${result.Name}.component`;
  }

  private buildFullNameFromResult(result: IApexComponentQueryResult): string {
    return `${this.buildNamespaceFromResult(result)}:${result.Name}`;
  }

  private buildNamespaceFromResult(result: IApexComponentQueryResult): string {
    return result.NamespacePrefix ? result.NamespacePrefix : 'c';
  }

  public dispose() { }
}
