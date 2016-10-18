import {IBuilder} from './builder';
import {Config} from '../utils/Config';

/**
 * Salesforce query builder class.
 *
 * Creates a Salesforce query
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
  private addRoute(route: string): SalesforceQueryBuilder {
    this.query += `/${route}`;

    return this;
  }

  /**
   * Implements build from {@link Ibuilder}
   * This will build a saleforce string for SOQL
   *
   * Executes the build for this class
   */
   build(): string {
    return this.query;
  }

  /**
   * Build a salesforce component query
   *
   * @param {string} name component name
   *
   * @return {string} component query
   */
   public buildComponentQuery(name: string): string {

    return this
      .addRoute('apexcomponent')
      .addRoute(Config.instance.customNamespace)
      .addRoute(name)
      .build();
  }

  public buildSOQLQuery(query: string): string {
    return this
      .addRoute('soqlquery')
      .addRoute(query)
      .build();
  }

}
