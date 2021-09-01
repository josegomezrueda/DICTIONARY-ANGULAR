
import {​​​​​​ Injectable }​​​​​​ from'@angular/core';
import {​​​​​​ MessageService }​​​​​​ from'primeng/api';

@Injectable({​​​​​​
providedIn: 'root'
}​​​​​​)
export class MessageToastService {​​​​​​

constructor(
private messageService: MessageService
 ) {​​​​​​ }​​​​​​
 
showToastError(title: string, msg: string, life?: number) {​​​​​​
let summaryText=title
let detailText=msg;
this.messageService.add({​​​​​​ severity: 'error', summary: summaryText, detail: detailText, life }​​​​​​);
 }​​​​​​
 
showToastSuccess(title: string, msg: string) {​​​​​​
let summaryText=title
let detailText=msg;
this.messageService.add({​​​​​​ severity: 'success', summary: summaryText, detail: detailText }​​​​​​);
 }​​​​​​
}​​​​​​

