import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  
})
export class HomeComponent implements OnInit {
  populatedData:any = [];
  closeResult = '';
  error: string = '';
  
  editForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required)
  });
  constructor(private router:Router, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
    this.api.data.subscribe((data)=> {
      if(data === '' || data === null){
        this.getAll();
      }else{
        this.searchDatabase(data);
        console.log(this.populatedData);
      }
    });
  }

  async getAll(){
    this.populatedData.splice(0, this.populatedData.length);
    var result:any = await this.api.get();
    for(const users of result.data){
      this.populatedData.push(users);
    }
  }
  async searchDatabase(term:string){
    this.populatedData.splice(0, this.populatedData.length);
    var result:any = await this.api.search(term);
    for(const users of result.data){
      this.populatedData.push(users);
    }
  }
  async delete(id:string){
    var result:any = await this.api.delete(id);
    if(result.success){
      this.getAll();
      alert("Successfully deleted user!");
    }else{
      alert("Credentials do not match!");
    }
  }
  async edit(id:string){
    var result:any;
    
    this.error = '';
    
    result = await this.api.patch(id,
    {
      name: this.editForm.value.fcName,
      age: this.editForm.value.fcAge,
      email: this.editForm.value.fcEmail
    });
    
    if(result.success){
      this.getAll();
    }else if(!result.success){
      alert(result.data)
    }
  }
  
  open(content: any) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUser(user:any){
    this.editForm.patchValue({
      fcPassword: ''
    });
    this.editForm.patchValue({
      fcName: user.name,
      fcAge: user.age,
      fcEmail: user.email
    });
  }
  
  nav(destination:string){
    this.router.navigate([destination]);
  }
}