import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from 'rxjs';
import {Role} from '../../../enum/role.enum';

@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent implements OnInit {

  addintervenantForm: FormGroup;
  addUserForm: FormGroup;
  roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
  errorsSubscription: Subscription;
  errorMessage: String;
  defaultRole: String = 'I';
  defaultActiveInnactif: String = 'true';
  hide = true;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    this.initForm();

    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }

  onSubmit(): void {
  }

  private initForm(): void {

    this.addintervenantForm = this.formBuilder.group({
      interfaceName: 'Intervenant',
      fname: ['', [Validators.required, Validators.maxLength(30)]],
      lname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.addUserForm = this.formBuilder.group({
      interfaceName: 'User',
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      role: ['', Validators.required],
      active: [true, Validators.required]
    });

  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddIntervenant(): void {
    const element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();

    if (this.addintervenantForm.valid && this.addUserForm.valid) {
      this.intervenantService.addIntervenant(this.addintervenantForm.value, this.addUserForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onCancelIntervenant(): void {
    this.intervenantService.cancelIntervenant();
    this.errorsSubscription.unsubscribe();
  }
}
