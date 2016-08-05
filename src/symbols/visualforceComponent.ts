/**
 * Visualforce Component Attribute interface.
 * TODO: needs a description
 */
interface VisualforceComponentAttribute {
  name: string;
  type: string;
  description: string;
}

/**
 * Visualforce Component interface.
 * TODO: needs a description
 */
interface VisualforceComponent {
  name: string;
  attributes: VisualforceComponentAttribute[];
  uri?: string
}
