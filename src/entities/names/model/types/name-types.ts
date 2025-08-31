interface IName {
  objectId: string
  Name: string
  Gender: string
  createdAt: string
  updatedAt: string
}

export interface IFetchNamesResponse {
  results: IName[]
}
