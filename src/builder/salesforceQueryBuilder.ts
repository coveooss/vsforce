import {IBuilder} from './builder';

/**
 * Salesforce query builder class.
 *
 * Creates a Salesforce SOQL query
 */
export class SalesforceQueryBuilder implements IBuilder {
  private query: string = 'sf://salesforce.com';

  constructor() {

  }

  /**
   * Adds a route to the query
   *
   * @param {string} route route to add the to query
   *
   * @return {SalesforceQueryBuilder} SalesforceQueryBuilder
   */
  public addRoute(route: string): SalesforceQueryBuilder {
    this.query += `/${route}`;

    return this;
  }

  /**
   * Implements build from {@link Ibuilder}
   * This will build a saleforce string for SOQL
   *
   * Executes the build for this class
   */
  public build(): string {
    return this.query;
  }
}
