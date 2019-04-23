import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {

  constructor(private message: NzMessageService) { }

  createMessage(type: string, msg: string): void {
    this.message.create(type, `${msg}`)
  }

  createSuccessMessage(msg: string): void {
    this.createMessage('success', msg)
  }

  createErrorMessage(msg: string): void {
    this.createMessage('error', msg)
  }

  createWarningMessage(msg: string): void {
    this.createMessage('warning', msg)
  }

  createLoadingMessage(msg: string): string {
    const id = this.message.loading(`${msg}`, { nzDuration: 0 }).messageId
    return id
  }

  removeLoadingMessage(id: string): void {
    this.message.remove(id)
  }
}
