export type dataHandlerType = (
  key: 'title' | 'body' | 'summary' | 'thumbnail',
  value: string,
) => void;

export type arrayHandlerType = (key: 'tags', value: string) => void;
