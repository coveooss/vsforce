interface VisualforceComponentAttribute {
  name: string;
  type: string;
  description: string;
}

interface VisualforceComponent {
  name: string;
  attributes: VisualforceComponentAttribute[];
  uri?: string
}
