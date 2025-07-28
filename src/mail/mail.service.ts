import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService
  ) {}

  async sendActivationLink(email: string, activationLink: string) {
    const url = `${process.env.api_url}/api/auth/activate/${activationLink}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Accountingizni faollashtiring",
      template: "./confirmation",
      context: {
        name: email, 
        url,
      },
    });
  }
}
