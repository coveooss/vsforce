import {IVisualforceComponentFetcher} from './visualforceComponentFetcher';
import {Connection, IQueryResult} from './../connection';
import {SOQLQueryBuilder} from '../builder/soqlQueryBuilder';
import {SalesforceQueryBuilder} from '../builder/salesforceQueryBuilder';

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

  // Salesforce builder (component)
  private sfBuilder = new SalesforceQueryBuilder();
  // SOQL builder
  private soqlBuilder = new SOQLQueryBuilder();

  /**
   * TODO: give a description
   */
  public fetchAll(): Thenable<IVisualforceComponent[]> {
    return new Promise<IVisualforceComponent[]>((resolve, reject) => {
      let componentList: IVisualforceComponent[] = [];
      let query = this.soqlBuilder.buildSOQLQuery({
        attributes: ['Description', 'Name', 'NamespacePrefix'],
        databases: ['ApexComponent']
      });

      this.conn.executeQuery(query).then((results: IQueryResult) => {
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
    return this.sfBuilder.buildComponentQuery(`${result.Name}.component`);
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
