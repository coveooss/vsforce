/**
 * Visualforce Component Attribute interface.
 * TODO: needs a description
 */
interface IVisualforceComponentAttribute {
  name: string;
  type: string;
  description: string;
}

/**
 * Visualforce Component interface.
 * TODO: needs a description
 */
interface IVisualforceComponent {
  name: string;
  attributes: IVisualforceComponentAttribute[];
  uri?: string;
}
