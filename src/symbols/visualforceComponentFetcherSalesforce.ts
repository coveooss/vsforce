import {VisualforceComponentFetcher} from './visualforceComponentFetcher';
import {Connection, QueryResult} from './../connection';

/**
 * Apex Component Query Result interface.
 * TODO: give a description
 */
interface ApexComponentQueryResult {
  Description: string;
  Name: string;
  NamespacePrefix?: string;
}

/**
 * Visualforce Component Fetcher Salesforce class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherSalesforce implements VisualforceComponentFetcher {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  // TODO: give a description
  public canOverwrite: boolean = false;

  /**
   * TODO: give a description
   */
  public fetchAll(): Thenable<VisualforceComponent[]> {
    return new Promise<VisualforceComponent[]>((resolve, reject) => {
      var componentList: VisualforceComponent[] = [];
      this.conn.executeQuery('SELECT Description, Name, NamespacePrefix FROM ApexComponent').then((results: QueryResult) => {
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

  /**
   * TODO: give a description
   * 
   * @param {ApexComponentQueryResult} result TODO: give a description
   * 
   * @return {string} SOQL query
   */
  private buildUriFromResult(result: ApexComponentQueryResult): string {
    return `sf://salesforce.com/apexcomponent/${this.buildNamespaceFromResult(result)}/${result.Name}.component`;
  }

  /**
   * TODO: give a description
   * 
   * @param {ApexComponentQueryResult} result TODO: give a description
   * 
   * @return {string} SOQL query
   */
  private buildFullNameFromResult(result: ApexComponentQueryResult): string {
    return `${this.buildNamespaceFromResult(result)}:${result.Name}`;
  }

  /**
   * TODO: give a description
   * 
   * @param {ApexComponentQueryResult} result TODO: give a description
   * 
   * @return {string} Saleforce namespace
   */
  private buildNamespaceFromResult(result: ApexComponentQueryResult): string {
    return result.NamespacePrefix ? result.NamespacePrefix : 'c';
  }

  /**
   * TODO: give a description
   */
  public dispose() { }
}
