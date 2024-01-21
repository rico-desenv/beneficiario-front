import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


import { ToastsContainer } from './toasts-container.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'ngbd-toast-global',
	standalone: true,
	imports: [NgbTooltipModule, ToastsContainer],
	templateUrl: './toast-global.component.html',
})
export class NgbdToastGlobal implements OnDestroy {
	constructor(public toastService: ToastService) {}

	showStandard(message: any) {
		this.toastService.show(message);
	}

	showSuccess(message: any) {
		this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(message: string | TemplateRef<any>) {
		this.toastService.show(message, { classname: 'bg-danger text-light', delay: 15000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
