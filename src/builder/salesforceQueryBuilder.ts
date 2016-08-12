import {IBuilder} from './builder';
import vscode = require('vscode');

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
      .addRoute(vscode.workspace.getConfiguration('vsforce.organization').get<string>('namespace'))
      .addRoute(name)
      .build();
  }
}
