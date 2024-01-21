import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/AuthService';
import { ToastService } from 'src/app/services/toast.service';
import { NgbdToastGlobal } from '../toaster/toast-global.component';


@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    toast = new NgbdToastGlobal(this.toastService);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService,
        private toastService: ToastService
    ) { 
        if (this.authenticationService.isAuthenticated()) { 
            this.router.navigate(['/cadastro']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.clean();
        this.authenticationService.login(this.f['username'].value, this.f['password'].value)        
    }
}