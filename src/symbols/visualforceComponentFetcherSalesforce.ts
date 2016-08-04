import {VisualforceComponentFetcher} from './visualforceComponentFetcher'
import {Connection, QueryResult} from './../connection'

interface ApexComponentQueryResult {
  Description: string;
  Name: string;
  NamespacePrefix?: string;
}

export class VisualforceComponentFetcherSalesforce implements VisualforceComponentFetcher {
  private conn: Connection = new Connection();

  public canOverwrite: boolean = false;

  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];
      this.conn.executeQuery("SELECT Description, Name, NamespacePrefix FROM ApexComponent").then((results: QueryResult) => {
        if (results && results.totalSize != 0) {
          for (var record in results.records) {
            componentList.push({
              name: this.buildFullNameFromResult(results.records[record]),
              uri: this.buildUriFromResult(results.records[record]),
              attributes: []
            })
          }

          resolve(componentList);
        }
      });
    });
  }

  private buildUriFromResult(result: ApexComponentQueryResult): string {
    return "sf://salesforce.com/apexcomponent/" +
      this.buildNamespaceFromResult(result) + "/" +
      result.Name + ".component";
  }

  private buildFullNameFromResult(result: ApexComponentQueryResult): string {
    return this.buildNamespaceFromResult(result) + ":" + result.Name;
  }

  private buildNamespaceFromResult(result: ApexComponentQueryResult): string {
    return result.NamespacePrefix ? result.NamespacePrefix : "c";
  }

  public dispose() { }
}
