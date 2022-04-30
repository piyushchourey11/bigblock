import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {
  title: string |  undefined;
  registrationForm:any;
  submited = false;
  id:any;
  plotData:any;
  constructor(private router: Router, 
    private api : ApiService, private route: ActivatedRoute, private fb: FormBuilder) {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id)
      if(this.id) {
        this.getPlotList(this.id);
      }else{
        this.setForm()
      }
  
  
    }
  
    getPlotList(id:any) {
      this.api.fetchData('plotList/'+id, {}, "Get").subscribe((res:any) => {
        if(res['status'] == 1) {
          this.plotData = res['data'];
          this.setForm()
  
        }else {
          this.setForm()
        }
      })
    }
  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;

  
  }

  setForm(){
    let data = this.plotData ? this.plotData :{}
    this.registrationForm = this.fb.group({
      plot_number: [data.plot_number?data.plot_number:'',[Validators.required,Validators.pattern("^[0-9]*$"),]],
      // ClientName: [data.first_name?data.first_name:'',Validators.required],
      township_name: [data.township_name?data.township_name:'',[Validators.required]],
      dimension: [data.dimension?data.dimension:'',[Validators.required]],
      plot_status:[data.plot_status?data.plot_status:'',[Validators.required]],
      longitude:[data.longitude?data.longitude:"",[Validators.required]],
      latitude:[data.latitude?data.latitude:"",[Validators.required]],
      commision_type:[data.commision_type?data.commision_type:"",[Validators.required]],
      selling_amount:[data.selling_amount?data.selling_amount:'',
      [Validators.required, Validators.pattern("^[0-9]*$")]],
      agent_commision:[data.agent_commision?data.agent_commision:'',
      [Validators.required, Validators.pattern("^[0-9]*$")]],
      plot_map_document:[data.plot_map_document?data.plot_map_document:'',[Validators.required]],
      document_data:[data.first_name?data.first_name:'',[Validators.required]],
      type:[data.first_name?data.first_name:''],
   
    });
  }

  
get f() { return this.registrationForm.controls}

register(){
  console.log(this.registrationForm.value);
 this.submited = true;
 if (this.registrationForm.invalid) {
   //  this.submited = false;
    return;
 }
 this.api.loader('start')

 let obj = this.registrationForm.value;

 this.api.postData('register/',obj,'post').subscribe(res => {
   console.log(res);
   if(res['status'] == 1) {
     this.api.loader('stop')

     this.submited = false;
     this.api.showNotification('success', res['message']);
   }else{      
     this.api.showNotification('error', res['message']);
     this.api.loader('stop')

     // this.updateFormdata({})
     
   }
   })

}
update(){
  console.log(this.registrationForm.value);
 this.submited = true;
 if (this.registrationForm.invalid) {
   //  this.submited = false;
    return;
 }
 this.api.loader('start')

 let obj = this.registrationForm.value;

 this.api.postData('updateTownship/',obj,'post').subscribe(res => {
   console.log(res);
   if(res['status'] == 1) {
     this.api.loader('stop')

     this.submited = false;
     this.api.showNotification('success', res['message']);
   }else{      
     this.api.showNotification('error', res['message']);
     this.api.loader('stop')

     // this.updateFormdata({})
     
   }
   })

}

onfileUpload(event:any){
// console.log(event.target.files[0]);
let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
const reader = new FileReader();
reader.readAsDataURL(event.target.files[0]);
let type:any = event.target.files[0].type;
    // console.log(event.target.files[0])
let filename:any = event.target.files[0].name;

    reader.onload = (event:any) => {

    let data =  event.target['result'];
    console.log('type',type)
    console.log('bs64',data)
    this.registrationForm.patchValue({
     document_data :data,
     type:type
    })
    }
}
}
