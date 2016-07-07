interface VisualforceComponentAttribute {
  name: string;
  type: string;
  values: string[];
}

interface VisualforceComponent {
  name: string;
  attributes: VisualforceComponentAttribute[];
  file?: string
}
