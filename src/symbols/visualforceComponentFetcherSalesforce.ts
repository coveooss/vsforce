import {VisualforceComponentFetcher} from './visualforceComponentFetcher'
import {Connection, QueryResult} from './../connection'

export class VisualforceComponentFetcherSalesforce implements VisualforceComponentFetcher {
  private conn: Connection = new Connection();

  public canOverwrite: boolean = false;

  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];
      this.conn.executeQuery("SELECT Description, Name, NamespacePrefix FROM ApexComponent", (results: QueryResult) => {
        if (results && results.totalSize != 0) {
          for (var record in results.records) {
            componentList.push({
              name: results.records[record].NamespacePrefix ? results.records[record].NamespacePrefix : "c:" + results.records[record].Name,
              attributes: []
            })
          }

          resolve(componentList);
        }
      });
    });
  }

  public dispose() { }
}
