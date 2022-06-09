import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {
  title: any;
  list:Array<{id:number,name:string,state:string,city:string,status:string}> = Array();
  bookinglist:any=[];
  selectedbooking:any;
  dtOptions: DataTables.Settings = {};
  // persons: Person[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  bulkUpload:any;
  showerror:boolean = false;
  dtElement!: DataTableDirective;
  constructor(private route: ActivatedRoute, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.url[0].path;
    this.list.push({id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'},{id:1,name:'it001',state:'Sam',city:'Sam',status:'Registered'});
    console.log(this.list);
    this.getbookinglist()
  }
  getbookinglist() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,destroy:true
    };
    this.api.fetchData('booking/getAll', {}, "Get").subscribe((res:any) => {
      if(res && res['status'] == 1) {
        if(this.bookinglist.length > 0) {
          this.bookinglist = res['data'];
          
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();     
            // this.bookinglist = res['data'];
          });
        }else{
          this.bookinglist = res['data'];

          this.dtTrigger.next();
        }
        // this.rerender()

      }else {
        this.bookinglist =[]
      }
    })
  }

  viewbookinglist(id:any) {

  }
  rerender(): void {
    setTimeout(() => {
   

    },1000)
  }
  deletebookinglist(id:any) {
      this.api.deleteData('booking/remove?id='+id, {}, "DELETE").subscribe((res:any) => {
        if(res['status'] == 1) {
          // this.bookinglist = res['data'];
          this.getbookinglist()
          this.api.showNotification('success',res['message'])
          document.getElementById('close-booking')?.click()
        }else {
          // this.bookinglist
          this.api.showNotification('error',res['message'])
        }
      })
    
  }

  editbookinglist(id:any) {
    let url = 'booking/edit/'+id;
    this.router.navigate([url]);
  }
  sendmail(id:any) {
    let url = 'booking/compose/'+id;
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  Onselectfile(event:any) {
    // console.log(event.target.files[0]);
    let regex  =new RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$')
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let type:any = event.target.files[0].type;
        // console.log(event.target.files[0])
    let filename:any = event.target.files[0].name;
   //  let file:any = event.target.files[0];
    this.bulkUpload =  event.target.files[0];
   
       //  reader.onload = (event:any) => {
    
       //  let data =  event.target['result'];
       //  console.log('type',type)
       //  console.log('bs64',data)
       
    
       //  }
     }
   
     onsubmitBulkUpload(){
       if(!this.bulkUpload) {
         this.showerror = true
       }
       const formData: FormData = new FormData();
       
       console.log( this.bulkUpload)
       formData.append('importFile', this.bulkUpload);
       this.api.loader('start')
       
       this.api.postData('booking/import',formData,"POST").subscribe(res => {
         if(res['status'] == 1) {
           this.api.loader('stop')
           this.getbookinglist();
           this.api.showNotification('success', res['message']);
           this.showerror = false;
           this.bulkUpload = undefined;
         }else {
           this.api.showNotification('error', res['message']);
           this.api.loader('stop')
           this.showerror = false;
         }
       })
     }
   
}
