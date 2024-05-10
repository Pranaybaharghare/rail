import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from './formfill.service';

@Component({
  selector: 'app-formfill',
  templateUrl: './formfill.component.html',
  styleUrls: ['./formfill.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class FormfillComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private formService: FormService) { }

  ngOnInit() {
  }

  connect() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    const payload = {
      username:this.username,
      password:this.password
      
    }
    this.formService.connect(payload).subscribe((data)=>{
      console.log(data);
      
    })
  }

}
