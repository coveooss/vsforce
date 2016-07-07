export interface VisualforceComponentFetcher {
  fetchAll(): Thenable<VisualforceComponent[]>
  canOverwrite: boolean
}
