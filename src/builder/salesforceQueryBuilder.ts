import {IBuilder} from './builder';

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
   * Adds a query string to the query
   *
   * @param {string} query query string to add the to query
   *
   * @return {SalesforceQueryBuilder} SalesforceQueryBuilder
   */
  public addQueryString(query: string): SalesforceQueryBuilder {

    return this;
  }

  /**
   * Implements build from {@link Ibuilder}
   * This will build a saleforce uri string for SOQL
   *
   * Executes the build for this class
   */
  public build(): string {
    return this.query;
  }
}
