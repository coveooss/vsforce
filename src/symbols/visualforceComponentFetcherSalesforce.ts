import {IVisualforceComponentFetcher} from './visualforceComponentFetcher';
import {Connection, IQueryResult} from './../connection';

/**
 * Apex Component Query Result interface.
 * TODO: give a description
 */
interface IApexComponentQueryResult {
  Description: string;
  Name: string;
  NamespacePrefix?: string;
}

/**
 * Visualforce Component Fetcher Salesforce class.
 *
 * TODO: finish this
 */
export class VisualforceComponentFetcherSalesforce implements IVisualforceComponentFetcher {
  // Connection handle through Salesforce
  private conn: Connection = new Connection();
  // TODO: give a description
  public canOverwrite: boolean = false;

  /**
   * TODO: give a description
   */
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

  /**
   * TODO: give a description
   *
   * @param {IApexComponentQueryResult} result TODO: give a description
   *
   * @return {string} SOQL query
   */
  private buildUriFromResult(result: IApexComponentQueryResult): string {
    return `sf://salesforce.com/apexcomponent/${this.buildNamespaceFromResult(result)}/${result.Name}.component`;
  }

  /**
   * TODO: give a description
   *
   * @param {IApexComponentQueryResult} result TODO: give a description
   *
   * @return {string} SOQL query
   */
  private buildFullNameFromResult(result: IApexComponentQueryResult): string {
    return `${this.buildNamespaceFromResult(result)}:${result.Name}`;
  }

  /**
   * TODO: give a description
   *
   * @param {IApexComponentQueryResult} result TODO: give a description
   *
   * @return {string} Saleforce namespace
   */
  private buildNamespaceFromResult(result: IApexComponentQueryResult): string {
    return result.NamespacePrefix ? result.NamespacePrefix : 'c';
  }

  /**
   * TODO: give a description
   */
  public dispose() { }
}
