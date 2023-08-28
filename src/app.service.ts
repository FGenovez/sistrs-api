import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { from, map, Observable, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly http: HttpService,
  ) {}

  getHello(): string {
    return '¡Backend del sistema de Transporte CEL - 2023!';
  }

  /**
   * Envia un correo electronico de confirmacion de registro
   * @param user
   */
  async sendConfirmedEmail(user: any) {
    const { email, fullname } = user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Email Confirmed',
      template: 'confirmed',
      context: {
        fullname,
        email,
      },
    });
  }

  getDataUser(data: any): Observable<AxiosResponse<any>> {
    const response = this.http
      .post('http://avance.cel.gob.sv:8080/cel-rest/service/login', data)
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
    return response;
  }
}