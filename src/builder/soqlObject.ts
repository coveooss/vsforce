/**
 * SOQL condition interface.
 * It helps us define a SOQL condition for the queries
 */
export interface ISOQLCondition {
  attribute: string;
  value: string;
  operator?: string;
}

/**
 * SOQL object interface.
 * It helps us define a SOQL object
 */
export interface ISOQLObject {
  attributes: string[];
  databases: string[];
  conditions?: ISOQLCondition[];
}

