export enum CourseStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  UNPUBLISHED = 'Unpublished',
}

export enum StudentCourseStatus {
  PENDING_APPROVAL = 'Pending Approval',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CALLED_OFF = 'Called off',
  SUSPENDED = 'Suspended',
  EXPELLED = 'Expelled',
}

export enum AssignmentSubmissionType {
  TEXT_ENTRY = 'Text Entry',
  WEBSITE_URL = 'Website URL',
  MEDIA_RECORDING = 'Media Recording',
  FILE_UPLOAD = 'File Upload',
}

export enum AssignmentSubmissionMedia {
  OFFLINE = 'Offline',
  ONLINE = 'Online',
}

export enum AssignmentSubmissionStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  GRADED = 'Graded',
  RESUBMIT = 'Resubmit',
}
