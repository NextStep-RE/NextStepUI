export interface Notification {
    notificationId: string;
    userId: string;
    internshipId: string;
    message: string;
    readStatus: boolean;
    timestamp: Date;
  }