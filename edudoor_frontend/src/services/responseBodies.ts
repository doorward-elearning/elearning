export type CourseResponse = {
  key: number;
  softKey: string;
  displayName: string;
  description: string;
  repoEntryKey: string;
  organisationKey: string | null;
  authors: string | null;
  location: string | null;
  externalId: string | null;
  externalRef: string | null;
  managedFlags: string | null;
  olatResourceKey: number;
  olatResourceId: number;
  olatResourceTypeName: string;
  title: string;
  editorRootNodeId: string;
  lifecycle: string | null;
};
