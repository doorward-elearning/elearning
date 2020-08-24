import { EmailOptions } from '@doorward/backend/modules/emails/emails.service';

export default abstract class EmailModel<T> {
  private readonly config: Partial<EmailOptions> = {};

  constructor(options: { subject: string; data?: T; recipient: string }) {
    this.config.template = this.getTemplate();
    this.config.subject = options.subject;
    this.config.data = options.data;
    this.config.recipient = options.recipient;
  }

  public abstract getTemplate(): string;

  public setRecipient(recipient: string): EmailModel<T> {
    this.config.recipient = recipient;
    return this;
  }

  public setSubject(subject: string): EmailModel<T> {
    this.config.subject = subject;
    return this;
  }

  public setData(data: T): EmailModel<T> {
    this.config.data = data;
    return this;
  }

  public setTemplate(template: string): EmailModel<T> {
    this.config.template = template;
    return this;
  }

  public getConfig(): EmailOptions {
    return this.config as EmailOptions;
  }
}
