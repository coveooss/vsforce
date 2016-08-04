interface IVisualforceComponentAttribute {
  name: string;
  type: string;
  description: string;
}

interface IVisualforceComponent {
  name: string;
  attributes: IVisualforceComponentAttribute[];
  uri?: string
}
